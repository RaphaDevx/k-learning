import { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, RefreshControl,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { loadExamRegistry, getExamsByCategory, COURSE_CONFIG } from '../../data/examRegistry';
import { useCourse } from '../../lib/courseContext';
import type { ExamMeta } from '../../types/exam';
import { C, R, F } from '../../constants/theme';

interface ResultMap {
  [examId: string]: { scorePct: number; takenAt: string };
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

export default function ExamTab() {
  const insets = useSafeAreaInsets();
  const { activeCourse } = useCourse();

  const [registry, setRegistry]     = useState<ExamMeta[]>([]);
  const [resultMap, setResultMap]   = useState<ResultMap>({});
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => { loadAll(); }, [])
  );

  async function loadAll(isRefresh = false) {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    try {
      const [exams, user] = await Promise.all([
        loadExamRegistry(),
        supabase.auth.getUser(),
      ]);
      setRegistry(exams);

      if (user.data.user) {
        const { data } = await supabase
          .from('exam_results')
          .select('exam_id, score_pct, taken_at')
          .eq('user_id', user.data.user.id)
          .order('taken_at', { ascending: false });

        if (data) {
          const map: ResultMap = {};
          data.forEach(r => {
            if (!map[r.exam_id]) map[r.exam_id] = { scorePct: r.score_pct, takenAt: r.taken_at };
          });
          setResultMap(map);
        }
      }
    } catch (e) {
      console.warn('ExamTab load error:', e);
    } finally {
      setLoading(false); setRefreshing(false);
    }
  }

  function startExam(exam: ExamMeta) {
    if (!exam.bundled) return;
    router.push(`/exam/${exam.id}` as any);
  }

  // Filter by active course if set
  const filteredRegistry = activeCourse
    ? registry.filter(e => e.course === activeCourse)
    : registry;

  const grouped = getExamsByCategory(filteredRegistry);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: C.bg }]}>
        <ActivityIndicator color={C.accentLight} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: C.bg }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 100 }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadAll(true)} tintColor={C.accentLight} />}
    >
      <View style={styles.titleRow}>
        <Text style={styles.heading}>Prüfungen</Text>
        {activeCourse && (
          <View style={styles.filterChip}>
            <Text style={styles.filterChipText}>{activeCourse}</Text>
          </View>
        )}
      </View>

      {Object.keys(grouped).length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📝</Text>
          <Text style={styles.emptyTitle}>Keine Prüfungen</Text>
          <Text style={styles.emptyText}>
            {activeCourse ? `Kein Kurs "${activeCourse}" mit Prüfungen gefunden` : 'Noch keine Prüfungen verfügbar'}
          </Text>
        </View>
      )}

      {Object.entries(grouped).map(([course, exams]) => {
        const cfg = COURSE_CONFIG[course] ?? { label: course, color: C.accent };
        return (
          <View key={course} style={styles.section}>
            <View style={[styles.sectionHeader, { borderLeftColor: cfg.color }]}>
              <Text style={styles.sectionTitle}>{cfg.label}</Text>
            </View>

            {exams.map(exam => {
              const result = resultMap[exam.id];
              const canStart = exam.bundled;

              return (
                <TouchableOpacity
                  key={exam.id}
                  style={[styles.card, !canStart && styles.cardDisabled]}
                  onPress={() => startExam(exam)}
                  disabled={!canStart}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardBody}>
                    <View style={[styles.dot, { backgroundColor: cfg.color }]} />
                    <View style={styles.cardText}>
                      <Text style={[styles.cardTitle, !canStart && styles.textMuted]}>
                        {exam.title}
                      </Text>
                      <Text style={styles.cardMeta}>
                        {exam.durationMinutes} Min · {exam.totalPoints} Pkt
                        {!canStart ? ' · Bald verfügbar' : ''}
                      </Text>
                    </View>
                    {result ? (
                      <View style={styles.resultBadge}>
                        <Text style={[styles.grade, { color: gradeColor(result.scorePct) }]}>
                          {gradeFromPct(result.scorePct)}
                        </Text>
                        <Text style={styles.gradePct}>{result.scorePct}%</Text>
                      </View>
                    ) : canStart ? (
                      <View style={[styles.startBadge, { backgroundColor: cfg.color + '18' }]}>
                        <Text style={[styles.startLabel, { color: cfg.color }]}>Start</Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 16, gap: 0 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  heading: { color: C.text, fontSize: F.xxl, fontWeight: '800', flex: 1 },
  filterChip: {
    backgroundColor: C.accent + '18', borderRadius: R.full,
    paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: C.accent + '30',
  },
  filterChipText: { color: C.accentLight, fontSize: F.xs, fontWeight: '700' },

  emptyState: { alignItems: 'center', paddingVertical: 48, gap: 8 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { color: C.text, fontSize: F.md, fontWeight: '700' },
  emptyText: { color: C.textSub, fontSize: F.sm, textAlign: 'center', lineHeight: 20 },

  section: { marginBottom: 24 },
  sectionHeader: { borderLeftWidth: 3, paddingLeft: 10, marginBottom: 10 },
  sectionTitle: { color: C.text, fontSize: F.base, fontWeight: '700' },

  card: {
    backgroundColor: C.surface, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.border,
    padding: 14, marginBottom: 8,
  },
  cardDisabled: { opacity: 0.45 },
  cardBody: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  cardText: { flex: 1 },
  cardTitle: { color: C.text, fontSize: F.sm, fontWeight: '600' },
  cardMeta: { color: C.textMuted, fontSize: F.xs, marginTop: 2 },
  textMuted: { color: C.textMuted },

  resultBadge: { alignItems: 'flex-end' },
  grade: { fontSize: F.md, fontWeight: '800' },
  gradePct: { color: C.textMuted, fontSize: F.xs },

  startBadge: { borderRadius: R.sm, paddingHorizontal: 10, paddingVertical: 5 },
  startLabel: { fontSize: F.xs, fontWeight: '800' },
});
