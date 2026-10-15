import { useState, useCallback, useMemo } from 'react';
import {
  View, Text, Pressable, StyleSheet,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors, T, S, R, GUTTER, HIT, HIT_SLOP, MAX_SCALE_CHROME } from '../../constants/theme';
import type { ColorTokens } from '../../constants/theme';

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
  const c = useColors();
  const insets = useSafeAreaInsets();
  const s = useMemo(() => makeStyles(c, insets.top + S.xs), [c, insets.top]);
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

  // Zurück-Button (44pt, Chevron + Wort)
  const renderBack = (onPress: () => void, label = 'Zurück') => (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={HIT_SLOP}
      style={({ pressed }) => [s.backButton, pressed && s.pressed]}
    >
      <Ionicons name="chevron-back" size={24} color={c.accent} />
      <Text style={s.backButtonText}>{label}</Text>
    </Pressable>
  );

  const renderLoading = () => (
    <View style={s.center}><ActivityIndicator color={c.textSub} size="large" /></View>
  );

  // ── CHANGELOG SCREEN ──
  if (screen === 'changelog') {
    return (
      <View style={s.container}>
        <View style={s.navHeader}>
          {renderBack(() => setScreen('browser'))}
          <View style={s.navTitleWrap}>
            <Text style={s.navTitle} numberOfLines={1}>Änderungsverlauf</Text>
            <Text style={s.navSub} numberOfLines={1}>{changelogCard?.front?.slice(0, 40)}</Text>
          </View>
        </View>

        {changelogLoading ? renderLoading() : changelog.length === 0 ? (
          <View style={s.center}>
            <Ionicons name="time-outline" size={44} color={c.textSub} />
            <Text style={s.emptyTitle}>Noch keine Änderungen</Text>
            <Text style={s.emptyText}>Änderungen werden ab jetzt gespeichert.</Text>
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
                    <Ionicons name="time-outline" size={14} color={c.textSub} />
                    <Text style={s.changelogDate}>{label}</Text>
                  </View>
                  {frontChanged && (
                    <View style={s.changelogDiff}>
                      <Text style={s.changelogField}>Vorderseite</Text>
                      <Text style={s.changelogOld} numberOfLines={2}>{entry.old_front}</Text>
                      <Ionicons name="arrow-down" size={14} color={c.textSub} />
                      <Text style={s.changelogNew} numberOfLines={2}>{entry.new_front}</Text>
                    </View>
                  )}
                  {backChanged && (
                    <View style={s.changelogDiff}>
                      <Text style={s.changelogField}>Rückseite</Text>
                      <Text style={s.changelogOld} numberOfLines={2}>{entry.old_back}</Text>
                      <Ionicons name="arrow-down" size={14} color={c.textSub} />
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
          {renderBack(() => setScreen('browser'))}
          <View style={s.navTitleWrap}>
            <Text style={s.navTitle} numberOfLines={1}>{isNew ? 'Neue Karte' : 'Karte bearbeiten'}</Text>
          </View>
          <Pressable
            onPress={saveCard}
            disabled={saving}
            accessibilityRole="button"
            accessibilityLabel="Karte speichern"
            style={({ pressed }) => [s.iconBtn, s.textBtn, pressed && s.pressed]}
          >
            {saving
              ? <ActivityIndicator size="small" color={c.accent} />
              : <Text style={s.saveBtn}>Speichern</Text>
            }
          </Pressable>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={s.editContent} keyboardShouldPersistTaps="handled">
          <Text style={s.editLabel}>Vorderseite</Text>
          <TextInput
            style={s.editInput}
            value={editFront}
            onChangeText={setEditFront}
            placeholder="Frage oder Begriff…"
            placeholderTextColor={c.textMuted}
            multiline
            autoFocus={isNew}
            accessibilityLabel="Vorderseite"
          />

          <Text style={[s.editLabel, { marginTop: S.xl }]}>Rückseite</Text>
          <TextInput
            style={s.editInput}
            value={editBack}
            onChangeText={setEditBack}
            placeholder="Antwort oder Erklärung…"
            placeholderTextColor={c.textMuted}
            multiline
            accessibilityLabel="Rückseite"
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
          {renderBack(() => { setScreen('selector'); loadDecks(); })}
          <View style={s.navTitleWrap}>
            <Text style={s.navTitle} numberOfLines={1}>{activeDeck?.topic}</Text>
            <Text style={s.navSub} numberOfLines={1}>{activeDeck?.course}</Text>
          </View>
          <Pressable
            onPress={downloadDeck}
            accessibilityRole="button"
            accessibilityLabel="Stapel exportieren"
            style={({ pressed }) => [s.iconBtn, pressed && s.pressed]}
          >
            <Ionicons name="share-outline" size={24} color={c.accent} />
          </Pressable>
          <Pressable
            onPress={() => openEdit()}
            accessibilityRole="button"
            accessibilityLabel="Neue Karte hinzufügen"
            style={({ pressed }) => [s.iconBtn, pressed && s.pressed]}
          >
            <Ionicons name="add-circle" size={26} color={c.accent} />
          </Pressable>
        </View>

        {browserLoading ? renderLoading() : (
          <ScrollView contentContainerStyle={s.browserContent}>
            {browserCards.length === 0 && (
              <View style={s.emptyState}>
                <Ionicons name="albums-outline" size={44} color={c.textSub} />
                <Text style={s.emptyTitle}>Keine Karten</Text>
                <Text style={s.emptyText}>Dieser Stapel ist noch leer.</Text>
                <Pressable
                  style={({ pressed }) => [s.primaryBtn, pressed && s.pressed]}
                  onPress={() => openEdit()}
                  accessibilityRole="button"
                  accessibilityLabel="Erste Karte erstellen"
                >
                  <Ionicons name="add" size={20} color={c.onAccent} />
                  <Text style={s.primaryBtnText}>Erste Karte erstellen</Text>
                </Pressable>
              </View>
            )}

            {browserCards.map((card) => (
              <View key={card.id} style={s.browserCard}>
                <View style={s.browserCardBody}>
                  <Text style={s.browserFront} numberOfLines={2}>{card.front}</Text>
                  <View style={s.browserDivider} />
                  <Text style={s.browserBack} numberOfLines={2}>{card.back}</Text>
                </View>
                <View style={s.browserActions}>
                  <Pressable
                    onPress={() => openChangelog(card)}
                    accessibilityRole="button"
                    accessibilityLabel="Änderungsverlauf anzeigen"
                    style={({ pressed }) => [s.iconBtn, pressed && s.pressed]}
                  >
                    <Ionicons name="time-outline" size={22} color={c.textSub} />
                  </Pressable>
                  <Pressable
                    onPress={() => openEdit(card)}
                    accessibilityRole="button"
                    accessibilityLabel="Karte bearbeiten"
                    style={({ pressed }) => [s.iconBtn, pressed && s.pressed]}
                  >
                    <Ionicons name="pencil" size={22} color={c.accent} />
                  </Pressable>
                  <Pressable
                    onPress={() => deleteCard(card)}
                    accessibilityRole="button"
                    accessibilityLabel="Karte löschen"
                    style={({ pressed }) => [s.iconBtn, pressed && s.pressed]}
                  >
                    <Ionicons name="trash-outline" size={22} color={c.red} />
                  </Pressable>
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
    if (loading) return renderLoading();

    const courses = [...new Set(decks.map(d => d.course))];
    return (
      <ScrollView style={s.container} contentContainerStyle={s.listContent}>
        <View style={s.selectorHeader}>
          <View style={{ flex: 1 }}>
            <Text style={s.heading} accessibilityRole="header">Flashcards</Text>
            <Text style={s.hint}>Wische nach rechts, wenn du die Antwort wusstest, nach links für nochmal.</Text>
          </View>
          <Pressable
            onPress={uploadDeck}
            style={({ pressed }) => [s.secondaryBtn, pressed && s.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Stapel aus JSON-Datei importieren"
          >
            <Ionicons name="cloud-upload-outline" size={20} color={c.accent} />
            <Text style={s.secondaryBtnText}>Import</Text>
          </Pressable>
        </View>

        {courses.map(course => {
          const courseDecks = decks.filter(d => d.course === course);
          const totalDue = courseDecks.reduce((sum, d) => sum + d.due, 0);
          return (
            <View key={course} style={s.section}>
              <View style={s.sectionRow}>
                <Text style={s.sectionTitle}>{course}</Text>
                {totalDue > 0 && (
                  <View style={s.badge}>
                    <Text style={s.badgeText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{totalDue} fällig</Text>
                  </View>
                )}
              </View>
              <View style={s.group}>
                {courseDecks.map((deck, idx) => (
                  <View key={`${deck.course}::${deck.topic}`}>
                    {idx > 0 && <View style={s.rowSeparator} />}
                    <View style={s.deckRow}>
                      <Pressable
                        style={({ pressed }) => [s.deckInfo, pressed && s.pressed]}
                        onPress={() => startDeck(deck.course, deck.topic)}
                        accessibilityRole="button"
                        accessibilityLabel={`${deck.topic} lernen, ${deck.total} Karten, ${deck.due} fällig`}
                      >
                        <Text style={s.deckTopic}>{deck.topic}</Text>
                        <Text style={s.deckMeta}>{deck.total} Karten · {deck.due} fällig</Text>
                      </Pressable>

                      <Pressable
                        onPress={() => openBrowser(deck.course, deck.topic)}
                        accessibilityRole="button"
                        accessibilityLabel={`Karten von ${deck.topic} verwalten`}
                        style={({ pressed }) => [s.iconBtn, pressed && s.pressed]}
                      >
                        <Ionicons name="list-outline" size={22} color={c.textSub} />
                      </Pressable>

                      {deck.due > 0 ? (
                        <Pressable
                          onPress={() => startDeck(deck.course, deck.topic)}
                          accessibilityRole="button"
                          accessibilityLabel={`${deck.due} Karten fällig, jetzt lernen`}
                          style={({ pressed }) => [s.iconBtn, pressed && s.pressed]}
                        >
                          <View style={s.dueBadge}>
                            <Text style={s.dueBadgeText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{deck.due}</Text>
                          </View>
                        </Pressable>
                      ) : (
                        <View style={s.iconBtn} accessible accessibilityLabel="Alles gelernt">
                          <Ionicons name="checkmark-circle" size={24} color={c.green} />
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {decks.length === 0 && (
          <View style={s.emptyState}>
            <Ionicons name="albums-outline" size={52} color={c.textSub} />
            <Text style={s.emptyTitle}>Noch keine Karten vorhanden</Text>
            <Text style={s.emptyText}>Importiere eine JSON-Datei, um Stapel hinzuzufügen.</Text>
            <Pressable
              onPress={uploadDeck}
              style={({ pressed }) => [s.primaryBtn, pressed && s.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Stapel aus JSON-Datei importieren"
            >
              <Ionicons name="cloud-upload-outline" size={20} color={c.onAccent} />
              <Text style={s.primaryBtnText}>Stapel importieren</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    );
  }

  // ── DONE ──
  if (sessionDone) {
    const total = sessionStats.knew + sessionStats.didnt;
    const pct = total > 0 ? Math.round((sessionStats.knew / total) * 100) : 0;
    const doneIcon = pct >= 70 ? 'trophy' : pct >= 40 ? 'trending-up' : 'book';
    return (
      <View style={s.center}>
        <Ionicons name={doneIcon} size={56} color={c.accent} />
        <Text style={s.doneTitle} accessibilityRole="header">Durchgang abgeschlossen</Text>
        <Text style={s.doneSub}>{pct}% gewusst</Text>
        <View style={s.doneRow}>
          <View style={s.doneStat}>
            <Text style={[s.doneNum, { color: c.green }]}>{sessionStats.knew}</Text>
            <Text style={s.doneLabel}>Gewusst</Text>
          </View>
          <View style={s.doneDivider} />
          <View style={s.doneStat}>
            <Text style={[s.doneNum, { color: c.red }]}>{sessionStats.didnt}</Text>
            <Text style={s.doneLabel}>Nochmal</Text>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [s.primaryBtn, s.primaryBtnWide, pressed && s.pressed]}
          onPress={() => { setScreen('selector'); loadDecks(); }}
          accessibilityRole="button"
          accessibilityLabel="Zurück zur Übersicht"
        >
          <Text style={s.primaryBtnText}>Zurück zur Übersicht</Text>
        </Pressable>
      </View>
    );
  }

  // ── STUDY ──
  const card = cards[currentIndex];
  if (!card) return null;

  return (
    <View style={s.container}>
      <View style={s.studyHeader}>
        {renderBack(() => setScreen('selector'), 'Beenden')}
        <View style={s.pill}>
          <Text style={s.pillText}>{currentIndex + 1} / {cards.length}</Text>
        </View>
        <Text style={s.coursePill} numberOfLines={1}>{card.course}</Text>
      </View>

      <View
        style={s.progressBar}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={`Karte ${currentIndex + 1} von ${cards.length}`}
      >
        <View style={[s.progressFill, { width: `${(currentIndex / cards.length) * 100}%` as any }]} />
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[s.cardWrapper, cardAnimStyle]}>
          <Animated.View style={[s.swipeOverlayLeft, didntOverlay]} pointerEvents="none">
            <Ionicons name="close" size={18} color={c.red} />
            <Text style={s.swipeOverlayTextLeft}>Nochmal</Text>
          </Animated.View>
          <Animated.View style={[s.swipeOverlayRight, knewOverlay]} pointerEvents="none">
            <Ionicons name="checkmark" size={18} color={c.green} />
            <Text style={s.swipeOverlayTextRight}>Gewusst</Text>
          </Animated.View>

          <Pressable
            style={s.card}
            onPress={() => setIsFlipped(f => !f)}
            accessibilityRole="button"
            accessibilityLabel={isFlipped ? 'Antwort, tippen um die Frage zu zeigen' : 'Frage, tippen um die Antwort aufzudecken'}
          >
            <Text style={[s.cardSide, isFlipped && { color: c.accent }]}>
              {isFlipped ? 'Antwort' : 'Frage'}
            </Text>
            <Text style={isFlipped ? s.cardBack : s.cardFront}>{isFlipped ? card.back : card.front}</Text>
            {!isFlipped && <Text style={s.tapHint}>Tippen zum Aufdecken</Text>}
          </Pressable>
        </Animated.View>
      </GestureDetector>

      {isFlipped ? (
        <View style={s.ratingRow}>
          <Pressable
            style={({ pressed }) => [s.ratingBtn, s.ratingNo, pressed && s.pressed]}
            onPress={() => advanceCard(0)}
            accessibilityRole="button"
            accessibilityLabel="Nochmal, nicht gewusst"
          >
            <Ionicons name="close" size={22} color={c.red} />
            <Text style={[s.ratingLabel, { color: c.red }]}>Nochmal</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [s.ratingBtn, s.ratingAlmost, pressed && s.pressed]}
            onPress={() => advanceCard(1)}
            accessibilityRole="button"
            accessibilityLabel="Fast gewusst"
          >
            <Ionicons name="remove" size={22} color={c.yellow} />
            <Text style={[s.ratingLabel, { color: c.yellow }]}>Fast</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [s.ratingBtn, s.ratingYes, pressed && s.pressed]}
            onPress={() => advanceCard(2)}
            accessibilityRole="button"
            accessibilityLabel="Gewusst"
          >
            <Ionicons name="checkmark" size={22} color={c.green} />
            <Text style={[s.ratingLabel, { color: c.green }]}>Gewusst</Text>
          </Pressable>
        </View>
      ) : (
        <View style={s.swipeHintRow}>
          <Text style={s.swipeHintText}>Wische nach links für nochmal, nach rechts für gewusst</Text>
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

function makeStyles(c: ColorTokens, top: number) {
  const input = {
    ...T.body,
    backgroundColor: c.surface, borderRadius: R.md,
    borderWidth: StyleSheet.hairlineWidth, borderColor: c.border,
    color: c.text, padding: S.lg,
    minHeight: 120, textAlignVertical: 'top',
  } as const;

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.bg },
    listContent: { paddingHorizontal: GUTTER, paddingTop: top + S.sm, paddingBottom: 100 },
    center: { flex: 1, backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center', gap: S.md, padding: S.xl },
    pressed: { opacity: 0.6 },

    // Buttons
    primaryBtn: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: S.sm,
      backgroundColor: c.accent, borderRadius: R.md,
      paddingHorizontal: S.xl, minHeight: 50, marginTop: S.sm,
    },
    primaryBtnWide: { alignSelf: 'stretch', marginTop: S.lg },
    primaryBtnText: { ...T.headline, color: c.onAccent },
    secondaryBtn: {
      flexDirection: 'row', alignItems: 'center', gap: S.xs,
      backgroundColor: c.accentSoft, borderRadius: R.md,
      paddingHorizontal: S.md, minHeight: HIT,
    },
    secondaryBtnText: { ...T.subhead, fontWeight: '600', color: c.accent },
    iconBtn: { width: HIT, height: HIT, alignItems: 'center', justifyContent: 'center' },
    textBtn: { width: undefined, paddingHorizontal: S.sm },
    backButton: { flexDirection: 'row', alignItems: 'center', minHeight: HIT, paddingRight: S.sm },
    backButtonText: { ...T.body, color: c.accent },

    // Selector header
    selectorHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: S.md, marginBottom: S.xl },
    heading: { ...T.largeTitle, color: c.text },
    hint: { ...T.footnote, color: c.textSub, marginTop: S.xs },

    // Deck list
    section: { marginBottom: S.xl },
    sectionRow: { flexDirection: 'row', alignItems: 'center', gap: S.sm, marginBottom: S.sm, paddingHorizontal: S.xs },
    sectionTitle: { ...T.footnote, fontWeight: '600', color: c.textSub, textTransform: 'uppercase', letterSpacing: 0.4, flexShrink: 1 },
    badge: { backgroundColor: c.accentSoft, borderRadius: R.sm, paddingHorizontal: S.sm, paddingVertical: S.xxs },
    badgeText: { ...T.caption1, fontWeight: '600', color: c.accent },
    group: { backgroundColor: c.surface, borderRadius: R.md, overflow: 'hidden' },
    rowSeparator: { height: StyleSheet.hairlineWidth, backgroundColor: c.separator, marginLeft: S.lg },
    deckRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: S.lg, paddingRight: S.xs },
    deckInfo: { flex: 1, minHeight: 56, justifyContent: 'center', paddingVertical: S.md },
    deckTopic: { ...T.body, color: c.text },
    deckMeta: { ...T.footnote, color: c.textSub, marginTop: S.xxs },
    dueBadge: {
      backgroundColor: c.accent, borderRadius: R.full, minWidth: 28, height: 28,
      paddingHorizontal: S.sm, alignItems: 'center', justifyContent: 'center',
    },
    dueBadgeText: { ...T.footnote, fontWeight: '700', color: c.onAccent },
    emptyState: { alignItems: 'center', paddingTop: S.xxxl, paddingHorizontal: S.xl, gap: S.sm },
    emptyTitle: { ...T.title3, color: c.text, textAlign: 'center' },
    emptyText: { ...T.subhead, color: c.textSub, textAlign: 'center' },

    // Nav header (browser + edit + changelog)
    navHeader: {
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: S.sm, paddingTop: top, paddingBottom: S.xs,
      borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: c.separator,
    },
    navTitleWrap: { flex: 1, minWidth: 0 },
    navTitle: { ...T.headline, color: c.text },
    navSub: { ...T.footnote, color: c.textSub },
    saveBtn: { ...T.headline, color: c.accent },

    // Browser
    browserContent: { padding: GUTTER, paddingBottom: 100, gap: S.md },
    browserCard: {
      backgroundColor: c.surface, borderRadius: R.md,
      flexDirection: 'row', alignItems: 'stretch',
    },
    browserCardBody: { flex: 1, padding: S.lg, gap: S.sm },
    browserFront: { ...T.callout, fontWeight: '600', color: c.text },
    browserDivider: { height: StyleSheet.hairlineWidth, backgroundColor: c.separator },
    browserBack: { ...T.subhead, color: c.textSub },
    browserActions: {
      borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: c.separator,
      alignItems: 'center', justifyContent: 'center',
    },
    browserCount: { ...T.footnote, color: c.textSub, textAlign: 'center', marginTop: S.sm },

    // Changelog
    changelogEntry: { backgroundColor: c.surface, borderRadius: R.md, padding: S.lg, gap: S.md },
    changelogMeta: { flexDirection: 'row', alignItems: 'center', gap: S.xs },
    changelogDate: { ...T.footnote, color: c.textSub },
    changelogDiff: { gap: S.xs },
    changelogField: { ...T.caption1, fontWeight: '600', color: c.textSub, textTransform: 'uppercase', letterSpacing: 0.4 },
    changelogOld: { ...T.subhead, color: c.red, textDecorationLine: 'line-through' },
    changelogNew: { ...T.subhead, color: c.green },

    // Edit screen
    editContent: { padding: GUTTER, paddingBottom: 100 },
    editLabel: { ...T.footnote, fontWeight: '600', color: c.textSub, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: S.sm },
    editInput: input,

    // Study
    studyHeader: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: S.sm,
      paddingHorizontal: S.sm, paddingTop: top, paddingBottom: S.xs,
    },
    pill: { backgroundColor: c.surfaceHigh, borderRadius: R.full, paddingHorizontal: S.md, paddingVertical: S.xs },
    pillText: { ...T.footnote, fontWeight: '600', color: c.textSub },
    coursePill: { ...T.footnote, fontWeight: '600', color: c.textSub, flexShrink: 1, maxWidth: '35%', paddingRight: S.sm },
    progressBar: { height: 4, backgroundColor: c.surfaceHigh, marginHorizontal: GUTTER, borderRadius: 2, overflow: 'hidden' },
    progressFill: { height: 4, backgroundColor: c.accent, borderRadius: 2 },
    cardWrapper: { flex: 1, margin: GUTTER },
    card: {
      flex: 1, backgroundColor: c.surface, borderRadius: R.lg, padding: S.xl,
      alignItems: 'center', justifyContent: 'center',
      borderWidth: StyleSheet.hairlineWidth, borderColor: c.border,
    },
    cardSide: { ...T.footnote, fontWeight: '600', color: c.textSub, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: S.lg },
    cardFront: { ...T.title3, color: c.text, textAlign: 'center' },
    cardBack: { ...T.body, color: c.text, textAlign: 'center' },
    tapHint: { ...T.footnote, color: c.textSub, marginTop: S.xl },
    swipeOverlayLeft: {
      position: 'absolute', left: S.lg, top: S.lg, zIndex: 10,
      flexDirection: 'row', alignItems: 'center', gap: S.xs,
      backgroundColor: c.redSoft, borderRadius: R.sm,
      paddingHorizontal: S.sm, paddingVertical: S.xs,
    },
    swipeOverlayRight: {
      position: 'absolute', right: S.lg, top: S.lg, zIndex: 10,
      flexDirection: 'row', alignItems: 'center', gap: S.xs,
      backgroundColor: c.greenSoft, borderRadius: R.sm,
      paddingHorizontal: S.sm, paddingVertical: S.xs,
    },
    swipeOverlayTextLeft: { ...T.subhead, fontWeight: '600', color: c.red },
    swipeOverlayTextRight: { ...T.subhead, fontWeight: '600', color: c.green },
    ratingRow: { flexDirection: 'row', gap: S.sm, paddingHorizontal: GUTTER, paddingBottom: S.lg },
    ratingBtn: {
      flex: 1, borderRadius: R.md, minHeight: 56, paddingVertical: S.md, paddingHorizontal: S.xs,
      alignItems: 'center', justifyContent: 'center', gap: S.xs,
    },
    ratingNo: { backgroundColor: c.redSoft },
    ratingAlmost: { backgroundColor: c.yellowSoft },
    ratingYes: { backgroundColor: c.greenSoft },
    ratingLabel: { ...T.subhead, fontWeight: '600', textAlign: 'center' },
    swipeHintRow: { alignItems: 'center', paddingHorizontal: GUTTER, paddingBottom: S.xl },
    swipeHintText: { ...T.footnote, color: c.textSub, textAlign: 'center' },

    // Done
    doneTitle: { ...T.title2, color: c.text, textAlign: 'center' },
    doneSub: { ...T.body, color: c.textSub },
    doneRow: { flexDirection: 'row', backgroundColor: c.surface, borderRadius: R.lg, padding: S.xl, gap: S.xl },
    doneStat: { flex: 1, alignItems: 'center' },
    doneNum: { ...T.title1 },
    doneLabel: { ...T.footnote, color: c.textSub, marginTop: S.xs },
    doneDivider: { width: StyleSheet.hairlineWidth, backgroundColor: c.separator },
  });
}
