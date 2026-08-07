import { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, RefreshControl,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { EXAM_REGISTRY, COURSE_CONFIG, getExamsByCategory } from '../../data/examRegistry';
import type { ExamMeta } from '../../types/exam';

interface ResultMap {
  [examId: string]: { scorePct: number; takenAt: string };
}

function gradeFromPct(pct: number): string {
  const g = Math.max(1, Math.min(6, 1 + 5 * (pct / 100)));
  return (Math.round(g * 2) / 2).toFixed(1);
}

function gradeColor(pct: number): string {
  if (pct >= 65) return '#4ade80';
  if (pct >= 55) return '#facc15';
  return '#f87171';
}

export default function ExamTab() {
  const [resultMap, setResultMap] = useState<ResultMap>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadResults();
    }, [])
  );

  async function loadResults(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('exam_results')
        .select('exam_id, score_pct, taken_at')
        .eq('user_id', user.id)
        .order('taken_at', { ascending: false });

      if (data) {
        const map: ResultMap = {};
        data.forEach(r => {
          if (!map[r.exam_id]) {
            map[r.exam_id] = { scorePct: r.score_pct, takenAt: r.taken_at };
          }
        });
        setResultMap(map);
      }
    } catch (e) {
      console.warn('loadResults error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function startExam(exam: ExamMeta) {
    if (!exam.bundled) return;
    router.push(`/exam/${exam.id}` as any);
  }

  const grouped = getExamsByCategory();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#6366f1" size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadResults(true)} tintColor="#6366f1" />}
    >
      <Text style={styles.heading}>Prüfungen</Text>

      {Object.entries(grouped).map(([course, exams]) => {
        const cfg = COURSE_CONFIG[course];
        if (!cfg) return null;

        return (
          <View key={course} style={styles.section}>
            <View style={[styles.sectionHeader, { borderLeftColor: exams[0].courseColor }]}>
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
                    <View style={[styles.dot, { backgroundColor: exam.courseColor }]} />
                    <View style={styles.cardText}>
                      <Text style={[styles.cardTitle, !canStart && styles.textMuted]}>
                        {exam.title}
                      </Text>
                      <Text style={styles.cardMeta}>
                        {exam.durationMinutes} Min · {exam.totalPoints} Pkt
                        {!canStart ? ' · Coming soon' : ''}
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
                      <Text style={styles.startLabel}>Start</Text>
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
  container: { flex: 1, backgroundColor: '#111827' },
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' },
  heading: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 20, marginTop: 8 },
  section: { marginBottom: 24 },
  sectionHeader: { borderLeftWidth: 3, paddingLeft: 10, marginBottom: 10 },
  sectionTitle: { color: '#e5e7eb', fontSize: 15, fontWeight: '700' },
  card: {
    backgroundColor: '#1f2937', borderRadius: 14,
    padding: 14, marginBottom: 8,
  },
  cardDisabled: { opacity: 0.45 },
  cardBody: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  cardText: { flex: 1 },
  cardTitle: { color: '#f9fafb', fontSize: 14, fontWeight: '600' },
  cardMeta: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  textMuted: { color: '#6b7280' },
  resultBadge: { alignItems: 'flex-end' },
  grade: { fontSize: 16, fontWeight: '800' },
  gradePct: { color: '#6b7280', fontSize: 11 },
  startLabel: { color: '#6366f1', fontSize: 13, fontWeight: '700' },
});
