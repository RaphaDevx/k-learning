import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView, FlatList,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../../lib/supabase';

interface DeckCard {
  id: string;
  course: string;
  topic: string;
  front: string;
  back: string;
  difficulty: number;
  next_review_at: string | null;
}

interface DeckMeta {
  course: string;
  topic: string;
  total: number;
  due: number;
}

type Screen = 'selector' | 'studying';

function sm2NextReview(quality: 0 | 1 | 2, prevInterval: number, prevEF: number) {
  const ef = Math.max(1.3, prevEF + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  let interval: number;
  if (quality < 2) {
    interval = 1;
  } else if (prevInterval === 0) {
    interval = 1;
  } else if (prevInterval === 1) {
    interval = 6;
  } else {
    interval = Math.round(prevInterval * ef);
  }
  const nextAt = new Date();
  nextAt.setDate(nextAt.getDate() + interval);
  return { ef, interval, nextAt: nextAt.toISOString() };
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
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (screen === 'selector') loadDecks();
    }, [screen])
  );

  async function loadDecks() {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: allCards } = await supabase
        .from('deck_cards')
        .select('id, course, topic, next_review_at')
        .is('deleted_at', null)
        .order('course');

      if (!allCards) { setDecks([]); return; }

      const now = new Date();
      const deckMap: Record<string, DeckMeta> = {};

      for (const card of allCards) {
        const key = `${card.course}::${card.topic}`;
        if (!deckMap[key]) {
          deckMap[key] = { course: card.course, topic: card.topic, total: 0, due: 0 };
        }
        deckMap[key].total++;
        if (!card.next_review_at || new Date(card.next_review_at) <= now) {
          deckMap[key].due++;
        }
      }

      setDecks(Object.values(deckMap).sort((a, b) => b.due - a.due));
    } catch (e) {
      console.warn('loadDecks error:', e);
    } finally {
      setLoading(false);
    }
  }

  async function startDeck(course: string, topic: string) {
    setLoading(true);
    try {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from('deck_cards')
        .select('*')
        .eq('course', course)
        .eq('topic', topic)
        .is('deleted_at', null)
        .or(`next_review_at.is.null,next_review_at.lte.${now}`)
        .limit(30);

      if (!data || data.length === 0) {
        const { data: allData } = await supabase
          .from('deck_cards')
          .select('*')
          .eq('course', course)
          .eq('topic', topic)
          .is('deleted_at', null)
          .limit(30);
        setCards(shuffle(allData ?? []));
      } else {
        setCards(shuffle(data));
      }

      setSelectedCourse(course);
      setCurrentIndex(0);
      setIsFlipped(false);
      setSessionDone(false);
      setSessionStats({ knew: 0, didnt: 0 });
      setScreen('studying');
    } catch (e) {
      console.warn('startDeck error:', e);
    } finally {
      setLoading(false);
    }
  }

  async function rateCard(quality: 0 | 1 | 2) {
    const card = cards[currentIndex];
    const { nextAt } = sm2NextReview(quality, 1, 2.5);

    setSessionStats(prev => ({
      knew: quality >= 2 ? prev.knew + 1 : prev.knew,
      didnt: quality < 2 ? prev.didnt + 1 : prev.didnt,
    }));

    supabase.from('deck_cards').update({ next_review_at: nextAt }).eq('id', card.id).then();

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(i => i + 1);
      setIsFlipped(false);
    } else {
      setSessionDone(true);
    }
  }

  if (screen === 'selector') {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator color="#6366f1" size="large" />
        </View>
      );
    }

    const courses = [...new Set(decks.map(d => d.course))];

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Flashcards</Text>

        {courses.map(course => {
          const courseDecks = decks.filter(d => d.course === course);
          const totalDue = courseDecks.reduce((s, d) => s + d.due, 0);

          return (
            <View key={course} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{course}</Text>
                {totalDue > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalDue} fällig</Text>
                  </View>
                )}
              </View>

              {courseDecks.map(deck => (
                <TouchableOpacity
                  key={`${deck.course}::${deck.topic}`}
                  style={styles.deckCard}
                  onPress={() => startDeck(deck.course, deck.topic)}
                  activeOpacity={0.7}
                >
                  <View style={styles.deckInfo}>
                    <Text style={styles.deckTopic}>{deck.topic}</Text>
                    <Text style={styles.deckMeta}>{deck.total} Karten</Text>
                  </View>
                  {deck.due > 0 ? (
                    <View style={styles.dueBadge}>
                      <Text style={styles.dueBadgeText}>{deck.due}</Text>
                    </View>
                  ) : (
                    <Text style={styles.doneText}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        {decks.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Noch keine Karten vorhanden.</Text>
          </View>
        )}
      </ScrollView>
    );
  }

  // Studying screen
  if (sessionDone) {
    return (
      <View style={styles.center}>
        <Text style={styles.doneEmoji}>🎉</Text>
        <Text style={styles.doneTitle}>Session abgeschlossen!</Text>
        <Text style={styles.doneSub}>
          {sessionStats.knew} gewusst · {sessionStats.didnt} nicht gewusst
        </Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => { setScreen('selector'); loadDecks(); }}
        >
          <Text style={styles.backBtnText}>Zurück zur Übersicht</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const card = cards[currentIndex];
  if (!card) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.studyHeader}>
        <TouchableOpacity onPress={() => setScreen('selector')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.studyProgress}>
          {currentIndex + 1} / {cards.length}
        </Text>
        <Text style={styles.coursePill}>{card.course}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentIndex) / cards.length) * 100}%` as any }]} />
      </View>

      {/* Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => setIsFlipped(f => !f)}
        activeOpacity={0.9}
      >
        <Text style={styles.cardSide}>{isFlipped ? 'Antwort' : 'Frage'}</Text>
        <Text style={styles.cardContent}>
          {isFlipped ? card.back : card.front}
        </Text>
        {!isFlipped && (
          <Text style={styles.tapHint}>Tippen zum Umdrehen</Text>
        )}
      </TouchableOpacity>

      {/* Rating buttons — only show after flip */}
      {isFlipped ? (
        <View style={styles.ratingRow}>
          <TouchableOpacity style={[styles.ratingBtn, styles.ratingDidnt]} onPress={() => rateCard(0)}>
            <Text style={styles.ratingEmoji}>✗</Text>
            <Text style={styles.ratingLabel}>Nicht gewusst</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.ratingBtn, styles.ratingKinda]} onPress={() => rateCard(1)}>
            <Text style={styles.ratingEmoji}>△</Text>
            <Text style={styles.ratingLabel}>Fast</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.ratingBtn, styles.ratingKnew]} onPress={() => rateCard(2)}>
            <Text style={styles.ratingEmoji}>✓</Text>
            <Text style={styles.ratingLabel}>Gewusst</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.ratingPlaceholder} />
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  heading: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 20, marginTop: 8 },

  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  sectionTitle: { color: '#e5e7eb', fontSize: 15, fontWeight: '700' },
  badge: { backgroundColor: '#7c3aed22', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { color: '#a78bfa', fontSize: 11, fontWeight: '700' },

  deckCard: {
    backgroundColor: '#1f2937', borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 8,
  },
  deckInfo: { flex: 1 },
  deckTopic: { color: '#f9fafb', fontSize: 14, fontWeight: '600' },
  deckMeta: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  dueBadge: {
    backgroundColor: '#6366f1', borderRadius: 20, width: 32, height: 32,
    alignItems: 'center', justifyContent: 'center',
  },
  dueBadgeText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  doneText: { color: '#4ade80', fontSize: 18, fontWeight: '700' },

  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: '#6b7280', fontSize: 16 },

  // Study mode
  studyHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 56, paddingBottom: 12,
  },
  backArrow: { color: '#9ca3af', fontSize: 22 },
  studyProgress: { color: '#9ca3af', fontSize: 14 },
  coursePill: { color: '#a78bfa', fontSize: 12, fontWeight: '600' },

  progressBar: { height: 3, backgroundColor: '#1f2937', marginHorizontal: 16 },
  progressFill: { height: 3, backgroundColor: '#6366f1', borderRadius: 2 },

  card: {
    flex: 1, margin: 16, backgroundColor: '#1f2937', borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', padding: 28,
  },
  cardSide: {
    color: '#6b7280', fontSize: 12, fontWeight: '600', textTransform: 'uppercase',
    letterSpacing: 1, marginBottom: 20,
  },
  cardContent: { color: '#f9fafb', fontSize: 18, lineHeight: 28, textAlign: 'center', fontWeight: '600' },
  tapHint: { color: '#4b5563', fontSize: 12, marginTop: 24 },

  ratingRow: { flexDirection: 'row', gap: 8, padding: 16, paddingBottom: 32 },
  ratingPlaceholder: { height: 80, padding: 16, paddingBottom: 32 },
  ratingBtn: {
    flex: 1, borderRadius: 14, paddingVertical: 14,
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  ratingDidnt: { backgroundColor: '#7f1d1d' },
  ratingKinda: { backgroundColor: '#78350f' },
  ratingKnew: { backgroundColor: '#14532d' },
  ratingEmoji: { fontSize: 20 },
  ratingLabel: { color: '#fff', fontSize: 11, fontWeight: '600' },

  // Done screen
  doneEmoji: { fontSize: 56 },
  doneTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  doneSub: { color: '#9ca3af', fontSize: 15 },
  backBtn: {
    backgroundColor: '#4f46e5', borderRadius: 14,
    paddingVertical: 16, paddingHorizontal: 32, marginTop: 8,
  },
  backBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
