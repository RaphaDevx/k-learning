import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useCourse } from '../../lib/courseContext';
import { C, R, F } from '../../constants/theme';

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
  storage_path: string | null;
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

function gradeColor(pct: number): string {
  if (pct >= 65) return C.green;
  if (pct >= 55) return C.yellow;
  return C.red;
}

function fmtDuration(s: number | null): string {
  if (!s) return '';
  const m = Math.floor(s / 60);
  return `${m} min`;
}

export default function CourseLernenScreen() {
  const { key } = useLocalSearchParams<{ key: string }>();
  const insets = useSafeAreaInsets();
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
          .select('id,title,duration_minutes,total_points,storage_path')
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
      for (const c of cards) {
        if (!topicMap[c.topic]) topicMap[c.topic] = { topic: c.topic, total: 0, due: 0 };
        topicMap[c.topic].total++;
        const nr = progressMap.get(c.id);
        const isDue = !nr || new Date(nr) <= now;
        if (isDue) { topicMap[c.topic].due++; due++; }
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
  const courseHex = course?.hex ?? C.accent;
  const daysLeft = course?.exam_date
    ? Math.ceil((new Date(course.exam_date).getTime() - Date.now()) / 86_400_000)
    : null;

  if (loading) {
    return (
      <View style={[s.center, { backgroundColor: C.bg }]}>
        <ActivityIndicator color={C.accentLight} size="large" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={[s.center, { backgroundColor: C.bg }]}>
        <Text style={{ color: C.textSub }}>Kurs nicht gefunden</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: C.accentLight }}>Zurück</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[s.container, { backgroundColor: C.bg }]}>
      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 8, backgroundColor: courseHex + '10', borderBottomColor: courseHex + '30' }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={16} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={C.text} />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerEmoji}>{course.icon}</Text>
          <View>
            <Text style={s.headerTitle}>{course.label}</Text>
            {daysLeft !== null && (
              <Text style={[s.headerSub, daysLeft <= 7 && { color: C.red }]}>
                {daysLeft > 0 ? `Prüfung in ${daysLeft} Tagen` : daysLeft === 0 ? 'Prüfung heute' : 'Prüfung vorbei'}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setActiveCourse(isActive ? null : key)}
          hitSlop={12}
          style={[s.filterToggle, isActive && { backgroundColor: C.green + '20' }]}
        >
          <Ionicons
            name={isActive ? 'radio-button-on' : 'radio-button-off'}
            size={16}
            color={isActive ? C.green : C.textMuted}
          />
          <Text style={[s.filterToggleText, isActive && { color: C.green }]}>
            {isActive ? 'Aktiv' : 'Filter'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[s.content, { paddingBottom: 100 }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor={C.accentLight} />}
      >
        {/* Progress summary */}
        <View style={s.statsRow}>
          <StatCard icon="albums-outline" value={totalCards} label="Karten" color={C.blue} />
          <StatCard icon="refresh-outline" value={totalDue} label="Fällig" color={totalDue > 0 ? C.red : C.green} />
          <StatCard icon="play-outline" value={videos.length} label="Videos" color={C.accent} />
          <StatCard icon="document-text-outline" value={exams.length} label="Prüfungen" color={courseHex} />
        </View>

        {/* Quick action */}
        {totalDue > 0 && (
          <TouchableOpacity
            style={[s.studyNowBtn, { backgroundColor: courseHex }]}
            onPress={() => openFlashcards('')}
            activeOpacity={0.8}
          >
            <Ionicons name="flash" size={18} color="#fff" />
            <Text style={s.studyNowText}>{totalDue} fällige Karten lernen</Text>
            <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        )}

        {/* Topics */}
        {topics.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Themen</Text>
            {topics.map(t => (
              <TouchableOpacity
                key={t.topic}
                style={s.topicRow}
                onPress={() => openFlashcards(t.topic)}
                activeOpacity={0.7}
              >
                <View style={s.topicInfo}>
                  <Text style={s.topicName} numberOfLines={1}>{t.topic}</Text>
                  <Text style={s.topicMeta}>{t.total} Karten</Text>
                </View>
                {t.due > 0 ? (
                  <View style={[s.dueBadge, { backgroundColor: courseHex }]}>
                    <Text style={s.dueBadgeText}>{t.due}</Text>
                  </View>
                ) : (
                  <Ionicons name="checkmark-circle" size={20} color={C.green} />
                )}
                <Ionicons name="chevron-forward" size={14} color={C.textMuted} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Exams */}
        {exams.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Prüfungen</Text>
            {exams.map(exam => {
              const result = results[exam.id];
              const hasData = !!exam.storage_path || ['makro2-probeklausur-fs26', 'makro2-probeklausur-b'].includes(exam.id);
              return (
                <TouchableOpacity
                  key={exam.id}
                  style={[s.examRow, !hasData && s.examRowDisabled]}
                  onPress={() => openExam(exam.id, hasData)}
                  activeOpacity={hasData ? 0.7 : 1}
                  disabled={!hasData}
                >
                  <View style={[s.examDot, { backgroundColor: courseHex }]} />
                  <View style={s.examInfo}>
                    <Text style={[s.examTitle, !hasData && { color: C.textMuted }]}>{exam.title}</Text>
                    <Text style={s.examMeta}>
                      {exam.duration_minutes} Min · {exam.total_points} Pkt
                      {!hasData ? ' · Bald verfügbar' : ''}
                    </Text>
                  </View>
                  {result ? (
                    <View style={s.examResult}>
                      <Text style={[s.examGrade, { color: gradeColor(result.score_pct) }]}>
                        {gradeFromPct(result.score_pct)}
                      </Text>
                      <Text style={s.examPct}>{result.score_pct}%</Text>
                    </View>
                  ) : hasData ? (
                    <Text style={[s.examStart, { color: courseHex }]}>Start</Text>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Videos</Text>
            {videos.map(v => (
              <View key={v.id} style={s.videoRow}>
                <View style={[s.videoIcon, { backgroundColor: courseHex + '18' }]}>
                  <Ionicons name="play-circle-outline" size={20} color={courseHex} />
                </View>
                <View style={s.videoInfo}>
                  <Text style={s.videoTitle} numberOfLines={2}>{v.title}</Text>
                  {v.duration_seconds && (
                    <Text style={s.videoMeta}>{fmtDuration(v.duration_seconds)}</Text>
                  )}
                </View>
              </View>
            ))}
            <TouchableOpacity
              style={s.feedLink}
              onPress={() => { setActiveCourse(key); router.push('/(tabs)/' as any); }}
              activeOpacity={0.7}
            >
              <Text style={[s.feedLinkText, { color: courseHex }]}>Alle Videos im Feed ansehen</Text>
              <Ionicons name="arrow-forward" size={14} color={courseHex} />
            </TouchableOpacity>
          </View>
        )}

        {topics.length === 0 && videos.length === 0 && exams.length === 0 && (
          <View style={s.emptyState}>
            <Text style={s.emptyEmoji}>{course.icon}</Text>
            <Text style={s.emptyTitle}>Noch kein Inhalt</Text>
            <Text style={s.emptyText}>Inhalte werden automatisch hinzugefügt wenn Flashcards, Videos oder Prüfungen für diesen Kurs verfügbar sind.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function StatCard({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  return (
    <View style={[s.statCard, { borderColor: color + '30' }]}>
      <Ionicons name={icon as any} size={16} color={color} />
      <Text style={[s.statValue, { color }]}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingBottom: 14,
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerEmoji: { fontSize: 28 },
  headerTitle: { color: C.text, fontSize: F.md, fontWeight: '800' },
  headerSub: { color: C.textMuted, fontSize: F.xs, marginTop: 1 },
  filterToggle: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: R.sm, paddingHorizontal: 8, paddingVertical: 5,
    borderWidth: 1, borderColor: C.border,
  },
  filterToggleText: { color: C.textMuted, fontSize: F.xs, fontWeight: '700' },

  content: { padding: 16, gap: 20 },

  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1, backgroundColor: C.surface, borderRadius: R.md,
    borderWidth: 1, padding: 12, alignItems: 'center', gap: 4,
  },
  statValue: { fontSize: F.lg, fontWeight: '800' },
  statLabel: { color: C.textSub, fontSize: 9, fontWeight: '600', textTransform: 'uppercase' },

  studyNowBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: R.lg, paddingHorizontal: 16, paddingVertical: 14,
  },
  studyNowText: { flex: 1, color: '#fff', fontSize: F.base, fontWeight: '700' },

  section: { gap: 8 },
  sectionTitle: {
    color: C.textMuted, fontSize: F.xs, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1,
  },

  topicRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.surface, borderRadius: R.md,
    borderWidth: 1, borderColor: C.border, padding: 14,
  },
  topicInfo: { flex: 1 },
  topicName: { color: C.text, fontSize: F.base, fontWeight: '600' },
  topicMeta: { color: C.textMuted, fontSize: F.xs, marginTop: 2 },
  dueBadge: {
    borderRadius: 20, minWidth: 28, height: 28,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6,
  },
  dueBadgeText: { color: '#fff', fontSize: F.xs, fontWeight: '800' },

  examRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.surface, borderRadius: R.md,
    borderWidth: 1, borderColor: C.border, padding: 14,
  },
  examRowDisabled: { opacity: 0.45 },
  examDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  examInfo: { flex: 1 },
  examTitle: { color: C.text, fontSize: F.sm, fontWeight: '600' },
  examMeta: { color: C.textMuted, fontSize: F.xs, marginTop: 2 },
  examResult: { alignItems: 'flex-end' },
  examGrade: { fontSize: F.md, fontWeight: '800' },
  examPct: { color: C.textMuted, fontSize: F.xs },
  examStart: { fontSize: F.sm, fontWeight: '700' },

  videoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.surface, borderRadius: R.md,
    borderWidth: 1, borderColor: C.border, padding: 12,
  },
  videoIcon: { width: 40, height: 40, borderRadius: R.sm, alignItems: 'center', justifyContent: 'center' },
  videoInfo: { flex: 1 },
  videoTitle: { color: C.text, fontSize: F.sm, fontWeight: '600', lineHeight: 18 },
  videoMeta: { color: C.textMuted, fontSize: F.xs, marginTop: 2 },
  feedLink: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    justifyContent: 'center', paddingVertical: 8,
  },
  feedLinkText: { fontSize: F.sm, fontWeight: '700' },

  emptyState: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { color: C.text, fontSize: F.md, fontWeight: '700' },
  emptyText: { color: C.textSub, fontSize: F.sm, textAlign: 'center', lineHeight: 20, paddingHorizontal: 16 },
});
