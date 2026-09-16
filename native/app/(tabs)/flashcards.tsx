import { useState, useCallback, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView, Dimensions,
  TextInput, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring,
  withTiming, runOnJS, interpolate, Extrapolation,
} from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCourse } from '../../lib/courseContext';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { supabase } from '../../lib/supabase';

const { width: SCREEN_W } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_W * 0.35;

interface DeckCard {
  id: string;
  course: string;
  topic: string;
  front: string;
  back: string;
  type: string | null;
}

interface DeckMeta {
  course: string;
  topic: string;
  total: number;
  due: number;
}

interface CardEdit {
  id: string;
  changed_at: string;
  old_front: string | null;
  old_back: string | null;
  new_front: string | null;
  new_back: string | null;
}

type Screen = 'selector' | 'studying' | 'browser' | 'edit' | 'changelog';

function sm2Next(quality: 0 | 1 | 2): string {
  const days = quality < 2 ? 1 : quality === 2 ? 4 : 6;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export default function FlashcardsScreen() {
  const [screen, setScreen] = useState<Screen>('selector');
  const [decks, setDecks] = useState<DeckMeta[]>([]);
  const [cards, setCards] = useState<DeckCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionDone, setSessionDone] = useState(false);
  const [sessionStats, setSessionStats] = useState({ knew: 0, didnt: 0 });

  // Browser + Edit state
  const [activeDeck, setActiveDeck] = useState<{ course: string; topic: string } | null>(null);
  const [browserCards, setBrowserCards] = useState<DeckCard[]>([]);
  const [browserLoading, setBrowserLoading] = useState(false);
  const [editCard, setEditCard] = useState<Partial<DeckCard> | null>(null);
  const [editFront, setEditFront] = useState('');
  const [editBack, setEditBack] = useState('');
  const [saving, setSaving] = useState(false);

  // Changelog state
  const [changelogCard, setChangelogCard] = useState<DeckCard | null>(null);
  const [changelog, setChangelog] = useState<CardEdit[]>([]);
  const [changelogLoading, setChangelogLoading] = useState(false);

  const { activeCourse } = useCourse();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardRotation = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      if (screen === 'selector') loadDecks();
    }, [screen])
  );

  async function loadDecks() {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      let cardQuery = supabase
        .from('deck_cards')
        .select('id, course, topic')
        .is('deleted_at', null)
        .order('course');
      if (activeCourse) cardQuery = cardQuery.eq('course', activeCourse);

      const [{ data: cards }, { data: progress }] = await Promise.all([
        cardQuery,
        user ? supabase.from('user_card_progress')
          .select('card_id, next_review_at')
          .eq('user_id', user.id) : Promise.resolve({ data: [] }),
      ]);

      if (!cards) { setDecks([]); return; }

      const now = new Date();
      const progressMap = new Map((progress ?? []).map(p => [p.card_id, p.next_review_at]));
      const map: Record<string, DeckMeta> = {};
      for (const c of cards) {
        const k = `${c.course}::${c.topic}`;
        if (!map[k]) map[k] = { course: c.course, topic: c.topic, total: 0, due: 0 };
        map[k].total++;
        const nr = progressMap.get(c.id);
        if (!nr || new Date(nr) <= now) map[k].due++;
      }
      setDecks(Object.values(map).sort((a, b) => b.due - a.due));
    } finally {
      setLoading(false);
    }
  }

  async function startDeck(course: string, topic: string) {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const now = new Date();

      const [{ data: allCards }, { data: progress }] = await Promise.all([
        supabase.from('deck_cards').select('*')
          .eq('course', course).eq('topic', topic)
          .is('deleted_at', null).limit(100),
        user ? supabase.from('user_card_progress')
          .select('card_id, next_review_at')
          .eq('user_id', user.id) : Promise.resolve({ data: [] }),
      ]);

      const progressMap = new Map((progress ?? []).map(p => [p.card_id, p.next_review_at]));
      let data = (allCards ?? []).filter(c => {
        const nr = progressMap.get(c.id);
        return !nr || new Date(nr) <= now;
      });
      // If nothing due, show all (review session)
      if (data.length === 0) data = allCards ?? [];

      setCards(shuffle(data ?? []));
      setCurrentIndex(0);
      setIsFlipped(false);
      setSessionDone(false);
      setSessionStats({ knew: 0, didnt: 0 });
      translateX.value = 0;
      translateY.value = 0;
      cardRotation.value = 0;
      setScreen('studying');
    } finally {
      setLoading(false);
    }
  }

  async function openBrowser(course: string, topic: string) {
    setActiveDeck({ course, topic });
    setBrowserLoading(true);
    setScreen('browser');
    try {
      const { data } = await supabase
        .from('deck_cards').select('*')
        .eq('course', course).eq('topic', topic)
        .is('deleted_at', null)
        .order('created_at', { ascending: true });
      setBrowserCards(data ?? []);
    } finally {
      setBrowserLoading(false);
    }
  }

  function openEdit(card?: DeckCard) {
    if (card) {
      setEditCard(card);
      setEditFront(card.front);
      setEditBack(card.back);
    } else {
      setEditCard({});
      setEditFront('');
      setEditBack('');
    }
    setScreen('edit');
  }

  async function saveCard() {
    if (!editFront.trim() || !editBack.trim()) {
      Alert.alert('Fehler', 'Vorder- und Rückseite dürfen nicht leer sein.');
      return;
    }
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (editCard?.id) {
        await supabase.from('deck_cards')
          .update({ front: editFront.trim(), back: editBack.trim() })
          .eq('id', editCard.id);

        // Write changelog entry
        await supabase.from('card_edits').insert({
          card_id: editCard.id,
          user_id: user?.id,
          old_front: editCard.front ?? null,
          old_back: editCard.back ?? null,
          new_front: editFront.trim(),
          new_back: editBack.trim(),
        });

        setBrowserCards(prev =>
          prev.map(c => c.id === editCard.id ? { ...c, front: editFront.trim(), back: editBack.trim() } : c)
        );
      } else {
        const { data, error } = await supabase.from('deck_cards')
          .insert({
            course: activeDeck?.course,
            topic: activeDeck?.topic,
            front: editFront.trim(),
            back: editBack.trim(),
            user_id: user?.id,
          })
          .select().single();
        if (error) throw error;
        setBrowserCards(prev => [...prev, data]);
      }
      setScreen('browser');
    } catch (e: any) {
      Alert.alert('Fehler', e?.message ?? 'Speichern fehlgeschlagen');
    } finally {
      setSaving(false);
    }
  }

  async function openChangelog(card: DeckCard) {
    setChangelogCard(card);
    setChangelogLoading(true);
    setScreen('changelog');
    try {
      const { data } = await supabase
        .from('card_edits')
        .select('id, changed_at, old_front, old_back, new_front, new_back')
        .eq('card_id', card.id)
        .order('changed_at', { ascending: false })
        .limit(50);
      setChangelog(data ?? []);
    } finally {
      setChangelogLoading(false);
    }
  }

  async function deleteCard(card: DeckCard) {
    Alert.alert('Karte löschen', `"${card.front.slice(0, 60)}" wirklich löschen?`, [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Löschen', style: 'destructive', onPress: async () => {
          await supabase.from('deck_cards')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', card.id);
          setBrowserCards(prev => prev.filter(c => c.id !== card.id));
        },
      },
    ]);
  }

  async function downloadDeck() {
    if (!activeDeck) return;
    try {
      const payload = browserCards.map(({ front, back, course, topic }) => ({ front, back, course, topic }));
      const json = JSON.stringify(payload, null, 2);
      const filename = `${activeDeck.course}_${activeDeck.topic}.json`
        .replace(/[^a-zA-Z0-9_.-]/g, '_');
      const path = FileSystem.cacheDirectory + filename;
      await FileSystem.writeAsStringAsync(path, json, { encoding: FileSystem.EncodingType.UTF8 });
      await Sharing.shareAsync(path, { mimeType: 'application/json', dialogTitle: 'Flashcards exportieren' });
    } catch (e: any) {
      Alert.alert('Export fehlgeschlagen', e?.message);
    }
  }

  async function uploadDeck() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;

      const file = result.assets[0];
      const text = await FileSystem.readAsStringAsync(file.uri, { encoding: FileSystem.EncodingType.UTF8 });
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) throw new Error('Datei muss ein JSON-Array sein');

      const valid = parsed.filter((c: any) =>
        typeof c.front === 'string' && typeof c.back === 'string' &&
        typeof c.course === 'string' && typeof c.topic === 'string'
      );
      if (valid.length === 0) throw new Error('Keine gültigen Karten gefunden (erwartet: [{front, back, course, topic}])');

      const { data: { user } } = await supabase.auth.getUser();
      const rows = valid.map((c: any) => ({
        front: c.front,
        back: c.back,
        course: c.course,
        topic: c.topic,
        user_id: user?.id,
      }));

      const { error } = await supabase.from('deck_cards').insert(rows);
      if (error) throw error;

      Alert.alert('Import erfolgreich', `${valid.length} Karten importiert.`);
      await loadDecks();
    } catch (e: any) {
      Alert.alert('Import fehlgeschlagen', e?.message);
    }
  }

  function advanceCard(quality: 0 | 1 | 2) {
    setSessionStats(prev => ({
      knew: quality >= 2 ? prev.knew + 1 : prev.knew,
      didnt: quality < 2 ? prev.didnt + 1 : prev.didnt,
    }));

    setCards(prev => {
      const card = prev[currentIndex];
      if (card) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (!user) return;
          supabase.from('user_card_progress').upsert({
            user_id: user.id,
            card_id: card.id,
            next_review_at: sm2Next(quality),
            last_reviewed_at: new Date().toISOString(),
            interval_days: quality < 2 ? 1 : quality === 2 ? 4 : 6,
            review_count: 1,
          }, { onConflict: 'user_id,card_id', ignoreDuplicates: false }).then();
        });
      }
      return prev;
    });

    setCurrentIndex(i => {
      if (i < cards.length - 1) return i + 1;
      setSessionDone(true);
      return i;
    });
    setIsFlipped(false);
  }

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.25;
      cardRotation.value = interpolate(
        e.translationX,
        [-SCREEN_W / 2, 0, SCREEN_W / 2],
        [-12, 0, 12],
        Extrapolation.CLAMP,
      );
    })
    .onEnd(e => {
      if (e.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_W * 1.5, { duration: 280 }, finished => {
          if (finished) {
            translateX.value = 0; translateY.value = 0; cardRotation.value = 0;
            runOnJS(advanceCard)(2);
          }
        });
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_W * 1.5, { duration: 280 }, finished => {
          if (finished) {
            translateX.value = 0; translateY.value = 0; cardRotation.value = 0;
            runOnJS(advanceCard)(0);
          }
        });
      } else {
        translateX.value = withSpring(0, { damping: 15 });
        translateY.value = withSpring(0, { damping: 15 });
        cardRotation.value = withSpring(0, { damping: 15 });
      }
    });

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${cardRotation.value}deg` },
    ],
  }));

  const knewOverlay = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD * 0.7], [0, 1], Extrapolation.CLAMP),
  }));

  const didntOverlay = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD * 0.7, 0], [1, 0], Extrapolation.CLAMP),
  }));

  // ── CHANGELOG SCREEN ──
  if (screen === 'changelog') {
    return (
      <View style={s.container}>
        <View style={s.navHeader}>
          <TouchableOpacity onPress={() => setScreen('browser')} hitSlop={16}>
            <Ionicons name="arrow-back" size={22} color="#9ca3af" />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.navTitle}>Änderungsverlauf</Text>
            <Text style={s.navSub} numberOfLines={1}>{changelogCard?.front?.slice(0, 40)}</Text>
          </View>
        </View>

        {changelogLoading ? (
          <View style={s.center}><ActivityIndicator color="#6366f1" size="large" /></View>
        ) : changelog.length === 0 ? (
          <View style={s.center}>
            <Ionicons name="time-outline" size={44} color="#374151" />
            <Text style={s.emptyText}>Noch keine Änderungen</Text>
            <Text style={s.emptyHint}>Edits werden ab jetzt gespeichert</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={s.browserContent}>
            {changelog.map((entry) => {
              const date = new Date(entry.changed_at);
              const label = date.toLocaleString('de-CH', {
                day: '2-digit', month: '2-digit', year: '2-digit',
                hour: '2-digit', minute: '2-digit',
              });
              const frontChanged = entry.old_front !== entry.new_front;
              const backChanged = entry.old_back !== entry.new_back;
              return (
                <View key={entry.id} style={s.changelogEntry}>
                  <View style={s.changelogMeta}>
                    <Ionicons name="time-outline" size={13} color="#4b5563" />
                    <Text style={s.changelogDate}>{label}</Text>
                  </View>
                  {frontChanged && (
                    <View style={s.changelogDiff}>
                      <Text style={s.changelogField}>Vorderseite</Text>
                      <Text style={s.changelogOld} numberOfLines={2}>{entry.old_front}</Text>
                      <Text style={s.changelogArrow}>↓</Text>
                      <Text style={s.changelogNew} numberOfLines={2}>{entry.new_front}</Text>
                    </View>
                  )}
                  {backChanged && (
                    <View style={s.changelogDiff}>
                      <Text style={s.changelogField}>Rückseite</Text>
                      <Text style={s.changelogOld} numberOfLines={2}>{entry.old_back}</Text>
                      <Text style={s.changelogArrow}>↓</Text>
                      <Text style={s.changelogNew} numberOfLines={2}>{entry.new_back}</Text>
                    </View>
                  )}
                </View>
              );
            })}
            <Text style={s.browserCount}>Letzte {changelog.length} Änderungen</Text>
          </ScrollView>
        )}
      </View>
    );
  }

  // ── EDIT SCREEN ──
  if (screen === 'edit') {
    const isNew = !editCard?.id;
    return (
      <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={s.navHeader}>
          <TouchableOpacity onPress={() => setScreen('browser')} hitSlop={16}>
            <Ionicons name="arrow-back" size={22} color="#9ca3af" />
          </TouchableOpacity>
          <Text style={s.navTitle}>{isNew ? 'Neue Karte' : 'Karte bearbeiten'}</Text>
          <TouchableOpacity onPress={saveCard} disabled={saving} hitSlop={16}>
            {saving
              ? <ActivityIndicator size="small" color="#6366f1" />
              : <Text style={s.saveBtn}>Speichern</Text>
            }
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={s.editContent} keyboardShouldPersistTaps="handled">
          <Text style={s.editLabel}>VORDERSEITE</Text>
          <TextInput
            style={s.editInput}
            value={editFront}
            onChangeText={setEditFront}
            placeholder="Frage oder Begriff..."
            placeholderTextColor="#4b5563"
            multiline
            autoFocus={isNew}
          />

          <Text style={[s.editLabel, { marginTop: 20 }]}>RÜCKSEITE</Text>
          <TextInput
            style={[s.editInput, s.editInputBack]}
            value={editBack}
            onChangeText={setEditBack}
            placeholder="Antwort oder Erklärung..."
            placeholderTextColor="#4b5563"
            multiline
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // ── BROWSER SCREEN ──
  if (screen === 'browser') {
    return (
      <View style={s.container}>
        <View style={s.navHeader}>
          <TouchableOpacity onPress={() => { setScreen('selector'); loadDecks(); }} hitSlop={16}>
            <Ionicons name="arrow-back" size={22} color="#9ca3af" />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.navTitle}>{activeDeck?.topic}</Text>
            <Text style={s.navSub}>{activeDeck?.course}</Text>
          </View>
          <TouchableOpacity onPress={downloadDeck} hitSlop={12} style={s.headerIcon}>
            <Ionicons name="download-outline" size={22} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openEdit()} hitSlop={12} style={s.headerIcon}>
            <Ionicons name="add" size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {browserLoading ? (
          <View style={s.center}><ActivityIndicator color="#6366f1" size="large" /></View>
        ) : (
          <ScrollView contentContainerStyle={s.browserContent}>
            {browserCards.length === 0 && (
              <View style={s.emptyState}>
                <Ionicons name="albums-outline" size={44} color="#374151" />
                <Text style={s.emptyText}>Keine Karten</Text>
                <TouchableOpacity style={s.addCardBtn} onPress={() => openEdit()}>
                  <Ionicons name="add" size={18} color="#fff" />
                  <Text style={s.addCardBtnText}>Erste Karte erstellen</Text>
                </TouchableOpacity>
              </View>
            )}

            {browserCards.map((card, i) => (
              <View key={card.id} style={s.browserCard}>
                <View style={s.browserCardBody}>
                  <Text style={s.browserFront} numberOfLines={2}>{card.front}</Text>
                  <View style={s.browserDivider} />
                  <Text style={s.browserBack} numberOfLines={2}>{card.back}</Text>
                </View>
                <View style={s.browserActions}>
                  <TouchableOpacity onPress={() => openChangelog(card)} hitSlop={10} style={s.browserAction}>
                    <Ionicons name="time-outline" size={18} color="#4b5563" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openEdit(card)} hitSlop={10} style={s.browserAction}>
                    <Ionicons name="pencil-outline" size={18} color="#6366f1" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteCard(card)} hitSlop={10} style={s.browserAction}>
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <Text style={s.browserCount}>{browserCards.length} Karten</Text>
          </ScrollView>
        )}
      </View>
    );
  }

  // ── SELECTOR ──
  if (screen === 'selector') {
    if (loading) return <View style={s.center}><ActivityIndicator color="#6366f1" size="large" /></View>;

    const courses = [...new Set(decks.map(d => d.course))];
    return (
      <ScrollView style={s.container} contentContainerStyle={s.listContent}>
        <View style={s.selectorHeader}>
          <View>
            <Text style={s.heading}>Flashcards</Text>
            <Text style={s.hint}>← Nicht gewusst · Wischen · Gewusst →</Text>
          </View>
          <TouchableOpacity onPress={uploadDeck} style={s.uploadBtn} hitSlop={8}>
            <Ionicons name="cloud-upload-outline" size={20} color="#6366f1" />
            <Text style={s.uploadBtnText}>Import</Text>
          </TouchableOpacity>
        </View>

        {courses.map(course => {
          const courseDecks = decks.filter(d => d.course === course);
          const totalDue = courseDecks.reduce((sum, d) => sum + d.due, 0);
          return (
            <View key={course} style={s.section}>
              <View style={s.sectionRow}>
                <Text style={s.sectionTitle}>{course}</Text>
                {totalDue > 0 && <View style={s.badge}><Text style={s.badgeText}>{totalDue} fällig</Text></View>}
              </View>
              {courseDecks.map(deck => (
                <View key={`${deck.course}::${deck.topic}`} style={s.deckCard}>
                  <TouchableOpacity
                    style={s.deckInfo}
                    onPress={() => startDeck(deck.course, deck.topic)}
                    activeOpacity={0.7}
                  >
                    <Text style={s.deckTopic}>{deck.topic}</Text>
                    <Text style={s.deckMeta}>{deck.total} Karten · {deck.due} fällig</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => openBrowser(deck.course, deck.topic)}
                    hitSlop={8}
                    style={s.deckEditBtn}
                  >
                    <Ionicons name="pencil-outline" size={16} color="#4b5563" />
                  </TouchableOpacity>

                  {deck.due > 0
                    ? <TouchableOpacity onPress={() => startDeck(deck.course, deck.topic)}>
                        <View style={s.dueBadge}><Text style={s.dueBadgeText}>{deck.due}</Text></View>
                      </TouchableOpacity>
                    : <Ionicons name="checkmark-circle" size={22} color="#4ade80" />
                  }
                </View>
              ))}
            </View>
          );
        })}

        {decks.length === 0 && (
          <View style={s.emptyState}>
            <Ionicons name="albums-outline" size={52} color="#374151" />
            <Text style={s.emptyText}>Noch keine Karten vorhanden</Text>
            <Text style={s.emptyHint}>Importiere eine JSON-Datei mit dem Button oben</Text>
          </View>
        )}
      </ScrollView>
    );
  }

  // ── DONE ──
  if (sessionDone) {
    const total = sessionStats.knew + sessionStats.didnt;
    const pct = total > 0 ? Math.round((sessionStats.knew / total) * 100) : 0;
    return (
      <View style={s.center}>
        <Text style={s.doneEmoji}>{pct >= 70 ? '🎉' : pct >= 40 ? '💪' : '📖'}</Text>
        <Text style={s.doneTitle}>Session fertig!</Text>
        <Text style={s.doneSub}>{pct}% gewusst</Text>
        <View style={s.doneRow}>
          <View style={s.doneStat}>
            <Text style={[s.doneNum, { color: '#4ade80' }]}>{sessionStats.knew}</Text>
            <Text style={s.doneLabel}>Gewusst</Text>
          </View>
          <View style={s.doneDivider} />
          <View style={s.doneStat}>
            <Text style={[s.doneNum, { color: '#f87171' }]}>{sessionStats.didnt}</Text>
            <Text style={s.doneLabel}>Nicht gewusst</Text>
          </View>
        </View>
        <TouchableOpacity style={s.backBtn} onPress={() => { setScreen('selector'); loadDecks(); }}>
          <Text style={s.backBtnText}>Zurück zur Übersicht</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── STUDY ──
  const card = cards[currentIndex];
  if (!card) return null;

  return (
    <View style={s.container}>
      <View style={s.studyHeader}>
        <TouchableOpacity onPress={() => setScreen('selector')} hitSlop={16}>
          <Ionicons name="arrow-back" size={22} color="#9ca3af" />
        </TouchableOpacity>
        <View style={s.pill}>
          <Text style={s.pillText}>{currentIndex + 1} / {cards.length}</Text>
        </View>
        <Text style={s.coursePill}>{card.course}</Text>
      </View>

      <View style={s.progressBar}>
        <View style={[s.progressFill, { width: `${(currentIndex / cards.length) * 100}%` as any }]} />
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[s.cardWrapper, cardAnimStyle]}>
          <Animated.View style={[s.swipeOverlayLeft, didntOverlay]} pointerEvents="none">
            <Text style={s.swipeOverlayTextLeft}>✗</Text>
          </Animated.View>
          <Animated.View style={[s.swipeOverlayRight, knewOverlay]} pointerEvents="none">
            <Text style={s.swipeOverlayTextRight}>✓</Text>
          </Animated.View>

          <TouchableOpacity
            style={[s.card, isFlipped && s.cardFlipped]}
            onPress={() => setIsFlipped(f => !f)}
            activeOpacity={0.95}
          >
            <Text style={[s.cardSide, isFlipped && { color: '#818cf8' }]}>
              {isFlipped ? 'ANTWORT' : 'FRAGE'}
            </Text>
            <Text style={s.cardText}>{isFlipped ? card.back : card.front}</Text>
            {!isFlipped && <Text style={s.tapHint}>Tippen zum Aufdecken</Text>}
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>

      {isFlipped ? (
        <View style={s.ratingRow}>
          <TouchableOpacity style={[s.ratingBtn, s.ratingNo]} onPress={() => advanceCard(0)}>
            <Ionicons name="close" size={20} color="#f87171" />
            <Text style={s.ratingLabel}>Nein</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.ratingBtn, s.ratingAlmost]} onPress={() => advanceCard(1)}>
            <Ionicons name="remove" size={20} color="#fbbf24" />
            <Text style={s.ratingLabel}>Fast</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.ratingBtn, s.ratingYes]} onPress={() => advanceCard(2)}>
            <Ionicons name="checkmark" size={20} color="#4ade80" />
            <Text style={s.ratingLabel}>Ja</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={s.swipeHintRow}>
          <Text style={s.swipeHintText}>← Nein · oder wischen · Ja →</Text>
        </View>
      )}
    </View>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117' },
  listContent: { padding: 16, paddingTop: 56, paddingBottom: 40 },
  center: { flex: 1, backgroundColor: '#0d1117', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },

  // Selector header
  selectorHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 },
  heading: { color: '#f9fafb', fontSize: 26, fontWeight: '800', marginBottom: 4 },
  hint: { color: '#4b5563', fontSize: 12, marginBottom: 24 },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#6366f122', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#6366f133',
  },
  uploadBtnText: { color: '#6366f1', fontSize: 13, fontWeight: '700' },

  // Deck list
  section: { marginBottom: 24 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  sectionTitle: { color: '#e5e7eb', fontSize: 15, fontWeight: '700' },
  badge: { backgroundColor: '#6366f122', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { color: '#818cf8', fontSize: 11, fontWeight: '700' },
  deckCard: {
    backgroundColor: '#161b22', borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8,
  },
  deckInfo: { flex: 1 },
  deckTopic: { color: '#f9fafb', fontSize: 14, fontWeight: '600' },
  deckMeta: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  deckEditBtn: { padding: 6 },
  dueBadge: {
    backgroundColor: '#6366f1', borderRadius: 20, width: 32, height: 32,
    alignItems: 'center', justifyContent: 'center',
  },
  dueBadgeText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  emptyState: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { color: '#6b7280', fontSize: 15 },
  emptyHint: { color: '#374151', fontSize: 12 },
  addCardBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#6366f1', borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 10, marginTop: 8,
  },
  addCardBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Nav header (browser + edit)
  navHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 56, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: '#21262d',
  },
  navTitle: { color: '#f9fafb', fontSize: 16, fontWeight: '700' },
  navSub: { color: '#6b7280', fontSize: 12, marginTop: 1 },
  headerIcon: { marginLeft: 12, padding: 4 },
  saveBtn: { color: '#6366f1', fontSize: 15, fontWeight: '700' },

  // Browser
  browserContent: { padding: 16, paddingBottom: 40, gap: 10 },
  browserCard: {
    backgroundColor: '#161b22', borderRadius: 12,
    borderWidth: 1, borderColor: '#21262d',
    flexDirection: 'row', alignItems: 'stretch',
  },
  browserCardBody: { flex: 1, padding: 14, gap: 8 },
  browserFront: { color: '#f9fafb', fontSize: 14, fontWeight: '600', lineHeight: 20 },
  browserDivider: { height: 1, backgroundColor: '#21262d' },
  browserBack: { color: '#818cf8', fontSize: 13, lineHeight: 19 },
  browserActions: {
    borderLeftWidth: 1, borderLeftColor: '#21262d',
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 12, gap: 16,
  },
  browserAction: { padding: 4 },
  browserCount: { color: '#374151', fontSize: 12, textAlign: 'center', marginTop: 8 },

  // Changelog
  changelogEntry: {
    backgroundColor: '#161b22', borderRadius: 12,
    borderWidth: 1, borderColor: '#21262d', padding: 14, gap: 10,
  },
  changelogMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  changelogDate: { color: '#4b5563', fontSize: 12, fontWeight: '600' },
  changelogDiff: { gap: 4 },
  changelogField: { color: '#6b7280', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  changelogOld: { color: '#ef4444', fontSize: 13, textDecorationLine: 'line-through', opacity: 0.7 },
  changelogArrow: { color: '#4b5563', fontSize: 12 },
  changelogNew: { color: '#4ade80', fontSize: 13 },

  // Edit screen
  editContent: { padding: 20, paddingBottom: 60 },
  editLabel: {
    color: '#4b5563', fontSize: 11, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  editInput: {
    backgroundColor: '#161b22', borderRadius: 12,
    borderWidth: 1, borderColor: '#21262d',
    color: '#f9fafb', fontSize: 16, padding: 14,
    minHeight: 120, textAlignVertical: 'top',
  },
  editInputBack: { borderColor: '#312e81', backgroundColor: '#13112a', color: '#a5b4fc' },

  // Study
  studyHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 56, paddingBottom: 12,
  },
  pill: { backgroundColor: '#161b22', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  pillText: { color: '#9ca3af', fontSize: 13, fontWeight: '600' },
  coursePill: { color: '#818cf8', fontSize: 12, fontWeight: '700' },
  progressBar: { height: 2, backgroundColor: '#161b22', marginHorizontal: 16, borderRadius: 2 },
  progressFill: { height: 2, backgroundColor: '#6366f1', borderRadius: 2 },
  cardWrapper: { flex: 1, margin: 16 },
  card: {
    flex: 1, backgroundColor: '#161b22', borderRadius: 20, padding: 28,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#21262d',
  },
  cardFlipped: { backgroundColor: '#13112a', borderColor: '#312e81' },
  cardSide: {
    color: '#6b7280', fontSize: 11, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20,
  },
  cardText: { color: '#f9fafb', fontSize: 18, lineHeight: 28, textAlign: 'center', fontWeight: '600' },
  tapHint: { color: '#374151', fontSize: 12, marginTop: 24 },
  swipeOverlayLeft: {
    position: 'absolute', left: 16, top: 16, zIndex: 10,
    borderWidth: 2, borderColor: '#ef4444', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  swipeOverlayRight: {
    position: 'absolute', right: 16, top: 16, zIndex: 10,
    borderWidth: 2, borderColor: '#4ade80', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  swipeOverlayTextLeft: { color: '#ef4444', fontWeight: '800', fontSize: 16 },
  swipeOverlayTextRight: { color: '#4ade80', fontWeight: '800', fontSize: 16 },
  ratingRow: { flexDirection: 'row', gap: 8, padding: 16, paddingBottom: 16 },
  ratingBtn: {
    flex: 1, borderRadius: 14, paddingVertical: 14,
    alignItems: 'center', justifyContent: 'center', gap: 4, borderWidth: 1,
  },
  ratingNo: { backgroundColor: '#1c0a0a', borderColor: '#450a0a' },
  ratingAlmost: { backgroundColor: '#1c1200', borderColor: '#431407' },
  ratingYes: { backgroundColor: '#0a1c0e', borderColor: '#052e16' },
  ratingLabel: { color: '#9ca3af', fontSize: 11, fontWeight: '600' },
  swipeHintRow: { alignItems: 'center', paddingBottom: 24 },
  swipeHintText: { color: '#374151', fontSize: 12 },

  // Done
  doneEmoji: { fontSize: 64 },
  doneTitle: { color: '#f9fafb', fontSize: 22, fontWeight: '800' },
  doneSub: { color: '#9ca3af', fontSize: 16 },
  doneRow: { flexDirection: 'row', backgroundColor: '#161b22', borderRadius: 16, padding: 20, gap: 20 },
  doneStat: { flex: 1, alignItems: 'center' },
  doneNum: { fontSize: 32, fontWeight: '800' },
  doneLabel: { color: '#6b7280', fontSize: 12, marginTop: 4 },
  doneDivider: { width: 1, backgroundColor: '#374151' },
  backBtn: { backgroundColor: '#6366f1', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 32 },
  backBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
