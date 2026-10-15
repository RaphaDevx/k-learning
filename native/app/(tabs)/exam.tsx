import { useState, useCallback, useMemo } from 'react';
import {
  View, Text, ScrollView, Pressable,
  StyleSheet, ActivityIndicator, RefreshControl,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { loadExamRegistry, getExamsByCategory } from '../../data/examRegistry';
import { useCourses } from '../../lib/courses';
import { useCourse } from '../../lib/courseContext';
import type { ExamMeta } from '../../types/exam';
import { useColors, T, S, R, GUTTER, HIT, MAX_SCALE_CHROME } from '../../constants/theme';
import type { ColorTokens } from '../../constants/theme';

interface ResultMap {
  [examId: string]: { scorePct: number; takenAt: string };
}

function gradeFromPct(pct: number): string {
  const g = Math.max(1, Math.min(6, 1 + 5 * (pct / 100)));
  return (Math.round(g * 2) / 2).toFixed(1);
}

type Status = { tone: 'green' | 'yellow' | 'red'; label: string; icon: 'checkmark-circle' | 'alert-circle' | 'close-circle' };
function statusFor(pct: number): Status {
  if (pct >= 65) return { tone: 'green', label: 'Bestanden', icon: 'checkmark-circle' };
  if (pct >= 55) return { tone: 'yellow', label: 'Knapp', icon: 'alert-circle' };
  return { tone: 'red', label: 'Nicht bestanden', icon: 'close-circle' };
}

export default function ExamTab() {
  const insets = useSafeAreaInsets();
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const courses = useCourses();
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
    if (!exam.available) return;
    router.push(`/exam/${exam.id}` as any);
  }

  const filteredRegistry = activeCourse
    ? registry.filter(e => e.course === activeCourse)
    : registry;

  const grouped = getExamsByCategory(filteredRegistry);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={c.textSub} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + S.lg, paddingBottom: 100 }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadAll(true)} tintColor={c.textSub} />}
    >
      <View style={styles.titleRow}>
        <Text style={styles.heading} accessibilityRole="header">Prüfungen</Text>
        {activeCourse && (
          <View style={styles.filterChip}>
            <Text style={styles.filterChipText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{activeCourse}</Text>
          </View>
        )}
      </View>

      {Object.keys(grouped).length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={44} color={c.textSub} />
          <Text style={styles.emptyTitle}>Keine Prüfungen</Text>
          <Text style={styles.emptyText}>
            {activeCourse ? `Für den Kurs "${activeCourse}" gibt es noch keine Prüfungen.` : 'Noch keine Prüfungen verfügbar.'}
          </Text>
        </View>
      )}

      {Object.entries(grouped).map(([course, exams]) => {
        const info = courses[course];
        const cfg = { label: info?.label ?? course, color: info?.hex ?? exams[0]?.courseColor ?? c.accent };
        return (
          <View key={course} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.dot, { backgroundColor: cfg.color }]} />
              <Text style={styles.sectionTitle} accessibilityRole="header">{cfg.label}</Text>
            </View>

            <View style={styles.group}>
              {exams.map((exam, i) => {
                const result = resultMap[exam.id];
                const canStart = exam.available;
                const st = result ? statusFor(result.scorePct) : null;
                const tone = st ? c[st.tone] : c.textSub;
                const toneSoft = st ? c[`${st.tone}Soft` as 'greenSoft' | 'yellowSoft' | 'redSoft'] : 'transparent';

                return (
                  <Pressable
                    key={exam.id}
                    style={({ pressed }) => [
                      styles.row,
                      i > 0 && styles.rowSep,
                      pressed && canStart && { backgroundColor: c.surfaceHigh },
                      !canStart && styles.rowDisabled,
                    ]}
                    onPress={() => startExam(exam)}
                    disabled={!canStart}
                    accessibilityRole="button"
                    accessibilityState={{ disabled: !canStart }}
                    accessibilityLabel={`${exam.title}, ${exam.durationMinutes} Minuten, ${exam.totalPoints} Punkte${
                      !canStart ? ', bald verfügbar' : result && st ? `, letztes Resultat ${gradeFromPct(result.scorePct)}, ${st.label}` : ''
                    }`}
                  >
                    <View style={styles.rowText}>
                      <Text style={styles.rowTitle}>{exam.title}</Text>
                      <Text style={styles.rowMeta}>
                        {exam.durationMinutes} Min · {exam.totalPoints} Pkt
                        {!canStart ? ' · Bald verfügbar' : ''}
                      </Text>
                    </View>
                    {result && st && canStart ? (
                      <View style={[styles.badge, { backgroundColor: toneSoft }]}>
                        <Ionicons name={st.icon} size={14} color={tone} />
                        <Text style={[styles.badgeText, { color: tone }]} maxFontSizeMultiplier={MAX_SCALE_CHROME}>
                          {gradeFromPct(result.scorePct)} · {st.label}
                        </Text>
                      </View>
                    ) : null}
                    {canStart && <Ionicons name="chevron-forward" size={16} color={c.textMuted} />}
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const makeStyles = (c: ColorTokens) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.bg },
  content: { paddingHorizontal: GUTTER },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: c.bg },

  titleRow: { flexDirection: 'row', alignItems: 'center', gap: S.md, marginBottom: S.lg },
  heading: { ...T.largeTitle, color: c.text, flexShrink: 1 },
  filterChip: {
    backgroundColor: c.accentSoft, borderRadius: R.full,
    paddingHorizontal: S.md, paddingVertical: S.xs,
  },
  filterChipText: { ...T.footnote, color: c.accent, fontWeight: '600' },

  emptyState: { alignItems: 'center', paddingVertical: S.xxxl, gap: S.sm },
  emptyTitle: { ...T.title3, color: c.text },
  emptyText: { ...T.subhead, color: c.textSub, textAlign: 'center' },

  section: { marginBottom: S.xl },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: S.sm, paddingHorizontal: S.lg, marginBottom: S.sm },
  dot: { width: 8, height: 8, borderRadius: 4 },
  sectionTitle: { ...T.footnote, color: c.textSub, textTransform: 'uppercase', flexShrink: 1 },

  group: { backgroundColor: c.surface, borderRadius: R.md, overflow: 'hidden' },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: S.md,
    minHeight: HIT, paddingHorizontal: S.lg, paddingVertical: S.md,
  },
  rowSep: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: c.separator },
  rowDisabled: { opacity: 0.5 },
  rowText: { flex: 1 },
  rowTitle: { ...T.body, color: c.text },
  rowMeta: { ...T.footnote, color: c.textSub, marginTop: S.xxs },

  badge: {
    flexDirection: 'row', alignItems: 'center', gap: S.xs,
    borderRadius: R.full, paddingHorizontal: S.sm, paddingVertical: S.xs,
  },
  badgeText: { ...T.footnote, fontWeight: '600' },
});
