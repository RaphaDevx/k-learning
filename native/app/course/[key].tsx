import { useState, useEffect, useMemo } from 'react';
import {
  View, Text, Pressable, StyleSheet, ScrollView,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useCourse } from '../../lib/courseContext';
import { useColors, T, S, R, GUTTER, HIT, MAX_SCALE_CHROME } from '../../constants/theme';
import type { ColorTokens } from '../../constants/theme';

interface CourseInfo {
  key: string;
  label: string;
  icon: string;
  hex: string;
  exam_date: string | null;
}

interface TopicStats {
  topic: string;
  total: number;
  due: number;
}

interface VideoItem {
  id: string;
  title: string;
  duration_seconds: number | null;
  sort_order: number;
}

interface ExamItem {
  id: string;
  title: string;
  duration_minutes: number;
  total_points: number;
  has_content: boolean;
}

interface ExamResult {
  exam_id: string;
  score_pct: number;
  taken_at: string;
}

function gradeFromPct(pct: number): string {
  const g = Math.max(1, Math.min(6, 1 + 5 * (pct / 100)));
  return (Math.round(g * 2) / 2).toFixed(1);
}

type Tone = 'green' | 'yellow' | 'red';
function gradeStatus(pct: number): { tone: Tone; label: string; icon: 'checkmark-circle' | 'alert-circle' | 'close-circle' } {
  if (pct >= 65) return { tone: 'green', label: 'Bestanden', icon: 'checkmark-circle' };
  if (pct >= 55) return { tone: 'yellow', label: 'Knapp', icon: 'alert-circle' };
  return { tone: 'red', label: 'Nicht bestanden', icon: 'close-circle' };
}

function fmtDuration(s: number | null): string {
  if (!s) return '';
  const m = Math.floor(s / 60);
  return `${m} min`;
}

export default function CourseLernenScreen() {
  const { key } = useLocalSearchParams<{ key: string }>();
  const insets = useSafeAreaInsets();
  const c = useColors();
  const s = useMemo(() => makeStyles(c), [c]);
  const { activeCourse, setActiveCourse } = useCourse();

  const [course, setCourse]   = useState<CourseInfo | null>(null);
  const [topics, setTopics]   = useState<TopicStats[]>([]);
  const [videos, setVideos]   = useState<VideoItem[]>([]);
  const [exams, setExams]     = useState<ExamItem[]>([]);
  const [results, setResults] = useState<Record<string, ExamResult>>({});
  const [totalDue, setTotalDue] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [loading, setLoading]   = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (key) load();
  }, [key]);

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    try {
      const now = new Date();

      const { data: { user } } = await supabase.auth.getUser();

      const [courseRes, cardsRes, videosRes, examsRes, progressRes] = await Promise.all([
        supabase.from('k_courses').select('key,label,icon,hex,exam_date').eq('key', key).single(),
        supabase.from('deck_cards')
          .select('id,topic')
          .eq('course', key)
          .is('deleted_at', null),
        supabase.from('videos')
          .select('id,title,duration_seconds,sort_order')
          .eq('course', key)
          .order('sort_order')
          .limit(8),
        supabase.from('k_exams')
          .select('id,title,duration_minutes,total_points,has_content')
          .eq('course', key)
          .eq('active', true)
          .order('sort_order'),
        user ? supabase.from('user_card_progress')
          .select('card_id,next_review_at')
          .eq('user_id', user.id) : Promise.resolve({ data: [] }),
      ]);

      if (courseRes.data) setCourse(courseRes.data);

      const cards = cardsRes.data ?? [];
      setTotalCards(cards.length);

      const progressMap = new Map((progressRes.data ?? []).map(p => [p.card_id, p.next_review_at]));
      const topicMap: Record<string, TopicStats> = {};
      let due = 0;
      for (const card of cards) {
        if (!topicMap[card.topic]) topicMap[card.topic] = { topic: card.topic, total: 0, due: 0 };
        topicMap[card.topic].total++;
        const nr = progressMap.get(card.id);
        const isDue = !nr || new Date(nr) <= now;
        if (isDue) { topicMap[card.topic].due++; due++; }
      }
      setTopics(Object.values(topicMap).sort((a, b) => b.due - a.due));
      setTotalDue(due);

      setVideos(videosRes.data ?? []);
      setExams(examsRes.data ?? []);

      if (user && examsRes.data?.length) {
        const { data: resultsData } = await supabase
          .from('exam_results')
          .select('exam_id,score_pct,taken_at')
          .eq('user_id', user.id)
          .in('exam_id', examsRes.data.map(e => e.id))
          .order('taken_at', { ascending: false });

        const map: Record<string, ExamResult> = {};
        for (const r of resultsData ?? []) {
          if (!map[r.exam_id]) map[r.exam_id] = r;
        }
        setResults(map);
      }
    } finally {
      setLoading(false); setRefreshing(false);
    }
  }

  function openFlashcards(topic: string) {
    // Navigate to flashcards tab with pre-selected topic via course context
    setActiveCourse(key);
    router.push('/(tabs)/flashcards' as any);
  }

  function openExam(examId: string, hasData: boolean) {
    if (!hasData) return;
    router.push(`/exam/${examId}` as any);
  }

  const isActive = activeCourse === key;
  const courseHex = course?.hex ?? c.accent;
  const daysLeft = course?.exam_date
    ? Math.ceil((new Date(course.exam_date).getTime() - Date.now()) / 86_400_000)
    : null;

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={c.textSub} size="large" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={s.center}>
        <Ionicons name="alert-circle-outline" size={44} color={c.textSub} />
        <Text style={s.emptyTitle}>Kurs nicht gefunden</Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [s.secondaryBtn, pressed && { opacity: 0.6 }]}
          accessibilityRole="button"
          accessibilityLabel="Zurück"
        >
          <Text style={s.secondaryBtnText}>Zurück</Text>
        </Pressable>
      </View>
    );
  }

  const hasContent = topics.length > 0 || videos.length > 0 || exams.length > 0;

  return (
    <View style={s.container}>
      {/* Navigation bar */}
      <View style={[s.navBar, { paddingTop: insets.top }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [s.backBtn, pressed && { opacity: 0.6 }]}
          accessibilityRole="button"
          accessibilityLabel="Zurück"
        >
          <Ionicons name="chevron-back" size={24} color={c.accent} />
          <Text style={s.backText}>Zurück</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveCourse(isActive ? null : key)}
          style={({ pressed }) => [s.filterToggle, pressed && { opacity: 0.6 }]}
          accessibilityRole="switch"
          accessibilityState={{ checked: isActive }}
          accessibilityLabel="Als aktiven Kurs filtern"
        >
          <Ionicons
            name={isActive ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={isActive ? c.accent : c.textSub}
          />
          <Text style={[s.filterToggleText, isActive && { color: c.accent }]} maxFontSizeMultiplier={MAX_SCALE_CHROME}>
            {isActive ? 'Aktiv' : 'Filter'}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[s.content, { paddingBottom: insets.bottom + S.xxl }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor={c.textSub} />}
      >
        {/* Title */}
        <View style={s.titleBlock}>
          <View style={s.titleRow}>
            <View style={[s.courseDot, { backgroundColor: courseHex }]} />
            <Text style={s.title} accessibilityRole="header">{course.label}</Text>
          </View>
          {daysLeft !== null && (
            <Text style={[s.subtitle, daysLeft <= 7 && { color: c.red }]}>
              {daysLeft > 0 ? `Prüfung in ${daysLeft} Tagen` : daysLeft === 0 ? 'Prüfung heute' : 'Prüfung vorbei'}
            </Text>
          )}
        </View>

        {/* Quick action */}
        {totalDue > 0 && (
          <Pressable
            style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.6 }]}
            onPress={() => openFlashcards('')}
            accessibilityRole="button"
            accessibilityLabel={`${totalDue} fällige Karten lernen`}
          >
            <Ionicons name="flash" size={20} color={c.onAccent} />
            <Text style={s.primaryBtnText}>{totalDue} fällige Karten lernen</Text>
          </Pressable>
        )}

        {/* Cards / Topics */}
        {topics.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle} accessibilityRole="header">Karten · {totalCards}</Text>
            <View style={s.group}>
              {topics.map((t, i) => (
                <Pressable
                  key={t.topic}
                  style={({ pressed }) => [s.row, i > 0 && s.rowSep, pressed && { backgroundColor: c.surfaceHigh }]}
                  onPress={() => openFlashcards(t.topic)}
                  accessibilityRole="button"
                  accessibilityLabel={`${t.topic}, ${t.total} Karten, ${t.due > 0 ? `${t.due} fällig` : 'alles gelernt'}`}
                >
                  <View style={s.rowText}>
                    <Text style={s.rowTitle} numberOfLines={2}>{t.topic}</Text>
                    <Text style={s.rowMeta}>{t.total} Karten</Text>
                  </View>
                  {t.due > 0 ? (
                    <View style={s.dueBadge}>
                      <Text style={s.dueBadgeText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{t.due} fällig</Text>
                    </View>
                  ) : (
                    <Ionicons name="checkmark-circle" size={22} color={c.green} />
                  )}
                  <Ionicons name="chevron-forward" size={16} color={c.textMuted} />
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle} accessibilityRole="header">Videos · {videos.length}</Text>
            <View style={s.group}>
              {videos.map((v, i) => (
                <View key={v.id} style={[s.row, i > 0 && s.rowSep]} accessible accessibilityLabel={`${v.title}${v.duration_seconds ? `, ${fmtDuration(v.duration_seconds)}` : ''}`}>
                  <Ionicons name="play-circle-outline" size={24} color={c.textSub} />
                  <View style={s.rowText}>
                    <Text style={s.rowTitle} numberOfLines={2}>{v.title}</Text>
                    {!!v.duration_seconds && <Text style={s.rowMeta}>{fmtDuration(v.duration_seconds)}</Text>}
                  </View>
                </View>
              ))}
              <Pressable
                style={({ pressed }) => [s.row, s.rowSep, pressed && { backgroundColor: c.surfaceHigh }]}
                onPress={() => { setActiveCourse(key); router.push('/(tabs)/' as any); }}
                accessibilityRole="button"
                accessibilityLabel="Alle Videos im Feed ansehen"
              >
                <Text style={[s.rowTitle, s.rowText, { color: c.accent }]}>Alle Videos im Feed ansehen</Text>
                <Ionicons name="chevron-forward" size={16} color={c.textMuted} />
              </Pressable>
            </View>
          </View>
        )}

        {/* Exams */}
        {exams.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle} accessibilityRole="header">Prüfungen · {exams.length}</Text>
            <View style={s.group}>
              {exams.map((exam, i) => {
                const result = results[exam.id];
                const hasData = exam.has_content;
                const st = result ? gradeStatus(result.score_pct) : null;
                const tone = st ? c[st.tone] : c.textSub;
                const toneSoft = st ? c[`${st.tone}Soft` as 'greenSoft' | 'yellowSoft' | 'redSoft'] : 'transparent';
                return (
                  <Pressable
                    key={exam.id}
                    style={({ pressed }) => [
                      s.row, i > 0 && s.rowSep,
                      !hasData && { opacity: 0.5 },
                      pressed && hasData && { backgroundColor: c.surfaceHigh },
                    ]}
                    onPress={() => openExam(exam.id, hasData)}
                    disabled={!hasData}
                    accessibilityRole="button"
                    accessibilityState={{ disabled: !hasData }}
                    accessibilityLabel={`${exam.title}, ${exam.duration_minutes} Minuten, ${exam.total_points} Punkte${
                      !hasData ? ', bald verfügbar' : result && st ? `, letztes Resultat ${gradeFromPct(result.score_pct)}, ${st.label}` : ''
                    }`}
                  >
                    <View style={s.rowText}>
                      <Text style={s.rowTitle}>{exam.title}</Text>
                      <Text style={s.rowMeta}>
                        {exam.duration_minutes} Min · {exam.total_points} Pkt
                        {!hasData ? ' · Bald verfügbar' : ''}
                      </Text>
                    </View>
                    {result && st && hasData ? (
                      <View style={[s.badge, { backgroundColor: toneSoft }]}>
                        <Ionicons name={st.icon} size={14} color={tone} />
                        <Text style={[s.badgeText, { color: tone }]} maxFontSizeMultiplier={MAX_SCALE_CHROME}>
                          {gradeFromPct(result.score_pct)} · {st.label}
                        </Text>
                      </View>
                    ) : null}
                    {hasData && <Ionicons name="chevron-forward" size={16} color={c.textMuted} />}
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {!hasContent && (
          <View style={s.emptyState}>
            <Ionicons name="folder-open-outline" size={44} color={c.textSub} />
            <Text style={s.emptyTitle}>Noch kein Inhalt</Text>
            <Text style={s.emptyText}>Inhalte erscheinen automatisch, sobald Karten, Videos oder Prüfungen für diesen Kurs verfügbar sind.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ColorTokens) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: S.md, backgroundColor: c.bg, padding: GUTTER },

  navBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: S.sm,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', minHeight: HIT, paddingRight: S.sm },
  backText: { ...T.body, color: c.accent },
  filterToggle: {
    flexDirection: 'row', alignItems: 'center', gap: S.xs,
    minHeight: HIT, paddingHorizontal: S.sm,
  },
  filterToggleText: { ...T.subhead, color: c.textSub },

  content: { paddingHorizontal: GUTTER, gap: S.xl },

  titleBlock: { gap: S.xs },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: S.md },
  courseDot: { width: 12, height: 12, borderRadius: 6 },
  title: { ...T.title1, color: c.text, flexShrink: 1 },
  subtitle: { ...T.subhead, color: c.textSub },

  section: { gap: S.sm },
  sectionTitle: { ...T.footnote, color: c.textSub, textTransform: 'uppercase', paddingHorizontal: S.lg },

  group: { backgroundColor: c.surface, borderRadius: R.md, overflow: 'hidden' },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: S.md,
    minHeight: HIT, paddingHorizontal: S.lg, paddingVertical: S.md,
  },
  rowSep: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: c.separator },
  rowText: { flex: 1 },
  rowTitle: { ...T.body, color: c.text },
  rowMeta: { ...T.footnote, color: c.textSub, marginTop: S.xxs },

  dueBadge: { borderRadius: R.full, backgroundColor: c.accentSoft, paddingHorizontal: S.sm, paddingVertical: S.xs },
  dueBadgeText: { ...T.footnote, color: c.accent, fontWeight: '600' },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: S.xs,
    borderRadius: R.full, paddingHorizontal: S.sm, paddingVertical: S.xs,
  },
  badgeText: { ...T.footnote, fontWeight: '600' },

  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: S.sm,
    minHeight: 50, borderRadius: R.md, backgroundColor: c.accent, paddingHorizontal: S.lg,
  },
  primaryBtnText: { ...T.headline, color: c.onAccent },
  secondaryBtn: {
    minHeight: 50, borderRadius: R.md, backgroundColor: c.accentSoft,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: S.xl,
  },
  secondaryBtnText: { ...T.headline, color: c.accent },

  emptyState: { alignItems: 'center', paddingVertical: S.xxl, gap: S.sm },
  emptyTitle: { ...T.title3, color: c.text },
  emptyText: { ...T.subhead, color: c.textSub, textAlign: 'center', paddingHorizontal: S.lg },
});
