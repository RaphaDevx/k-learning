import { useEffect, useRef, useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { loadExam } from '../../data/examLoader';
import QuestionFigure from '../../components/QuestionFigure';
import type { AnswerMap, ExamData, ExamQuestion } from '../../types/exam';
import { useColors, T, S, R, GUTTER, HIT } from '../../constants/theme';
import RichText from '../../components/RichText';
import type { ColorTokens } from '../../constants/theme';

type Tone = 'green' | 'yellow' | 'red';

function gradeTone(pct: number): Tone {
  if (pct >= 65) return 'green';
  if (pct >= 55) return 'yellow';
  return 'red';
}

function gradeLabel(pct: number): string {
  if (pct >= 85) return 'Ausgezeichnet';
  if (pct >= 65) return 'Bestanden';
  if (pct >= 55) return 'Knapp';
  return 'Nicht bestanden';
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

type Verdict = 'correct' | 'wrong' | 'skipped' | 'open';

// Mirrors scoreExam in exam/[id].tsx (empty `correct` + no answer = correct).
function verdictFor(q: ExamQuestion, given: string[]): Verdict {
  if (q.type === 'open') return 'open';
  if (given.length === 0 && q.correct.length > 0) return 'skipped';
  const correctSet = new Set(q.correct);
  const givenSet = new Set(given);
  const allRight = q.correct.every(k => givenSet.has(k)) && given.every(k => correctSet.has(k));
  return allRight ? 'correct' : 'wrong';
}

export default function ResultsScreen() {
  const params = useLocalSearchParams<{
    examId: string;
    title: string;
    course: string;
    scorePct: string;
    pointsEarned: string;
    totalPoints: string;
    grade: string;
    answers: string;
    takenAt: string;
    durationSeconds: string;
  }>();

  const saved = useRef(false);

  const scorePct = parseInt(params.scorePct ?? '0', 10);
  const pointsEarned = parseInt(params.pointsEarned ?? '0', 10);
  const totalPoints = parseInt(params.totalPoints ?? '0', 10);
  const durationSeconds = parseInt(params.durationSeconds ?? '0', 10);
  const answers: AnswerMap = params.answers ? JSON.parse(params.answers) : {};
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const tone = gradeTone(scorePct);
  const color = c[tone];
  const soft = c[`${tone}Soft` as 'greenSoft' | 'yellowSoft' | 'redSoft'];
  const [exam, setExam] = useState<ExamData | null>(null);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!saved.current) {
      saved.current = true;
      saveResult();
    }
    loadExam(params.examId)
      .then(d => setExam(d ?? null))
      .catch(() => setExam(null))
      .finally(() => setReviewLoading(false));
  }, []);

  async function saveResult() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('exam_results').insert({
        user_id: user.id,
        exam_id: params.examId,
        score_pct: scorePct,
        answers: answers,
        taken_at: params.takenAt,
        duration_seconds: durationSeconds,
      });
    } catch (e) {
      console.warn('saveResult error:', e);
    }
  }

  const reviewItems = useMemo(() => {
    if (!exam) return [];
    return exam.sections.flatMap(sec => sec.questions).map(q => ({
      q, verdict: verdictFor(q, answers[q.id] ?? []),
    }));
  }, [exam]);

  const verdictMeta = (v: Verdict) => {
    switch (v) {
      case 'correct': return { icon: 'checkmark-circle' as const, color: c.green, label: 'Richtig' };
      case 'wrong':   return { icon: 'close-circle' as const, color: c.red, label: 'Falsch' };
      case 'skipped': return { icon: 'remove-circle' as const, color: c.yellow, label: 'Nicht beantwortet' };
      default:        return { icon: 'create-outline' as any, color: c.textSub, label: 'Offene Frage' };
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + S.xl, paddingBottom: insets.bottom + S.xxl }]}>
        {/* Score */}
        <View style={styles.scoreBlock} accessible accessibilityLabel={`Note ${params.grade}, ${scorePct} Prozent, ${gradeLabel(scorePct)}, ${pointsEarned} von ${totalPoints} Punkten`}>
          <Text style={styles.caption}>Deine Note</Text>
          <Text style={[styles.gradeText, { color }]}>{params.grade}</Text>
          <View style={[styles.statusPill, { backgroundColor: soft }]}>
            <Ionicons name={tone === 'red' ? 'close-circle' : tone === 'yellow' ? 'alert-circle' : 'checkmark-circle'} size={18} color={color} />
            <Text style={[styles.statusText, { color }]}>{gradeLabel(scorePct)}</Text>
          </View>
          <Text style={styles.scoreLine}>{scorePct}% · {pointsEarned} / {totalPoints} Punkte</Text>
          <Text style={styles.duration}>Dauer: {formatDuration(durationSeconds)}</Text>
        </View>

        {/* Exam info */}
        <View style={styles.group}>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>{params.title}</Text>
            <Text style={styles.infoMeta}>
              {params.course} · {new Date(params.takenAt).toLocaleDateString('de-CH', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              })}
            </Text>
          </View>
        </View>

        {/* Review */}
        <Text style={styles.sectionTitle} accessibilityRole="header">Auswertung</Text>
        {reviewLoading ? (
          <ActivityIndicator color={c.textSub} />
        ) : reviewItems.length === 0 ? (
          <Text style={styles.hint}>Die Auswertung ist nicht verfügbar.</Text>
        ) : (
          <View style={styles.group}>
            {reviewItems.map(({ q, verdict }, i) => {
              const m = verdictMeta(verdict);
              const isOpenRow = expanded === q.id;
              const given = answers[q.id] ?? [];
              const explanation = q.type === 'open' ? (q.modelAnswer ?? q.explanation) : q.explanation;
              const canExpand = !!explanation || q.type !== 'open';
              return (
                <View key={q.id} style={i > 0 && styles.rowSep}>
                  <Pressable
                    style={({ pressed }) => [styles.qRow, pressed && { backgroundColor: c.surfaceHigh }]}
                    onPress={() => setExpanded(isOpenRow ? null : q.id)}
                    disabled={!canExpand}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isOpenRow }}
                    accessibilityLabel={`Frage ${q.number}, ${m.label}. ${q.text}`}
                    accessibilityHint={canExpand ? 'Zeigt oder verbirgt die Erklärung' : undefined}
                  >
                    <Ionicons name={m.icon} size={22} color={m.color} />
                    <View style={styles.qText}>
                      <RichText text={`${q.number}. ${q.text}`} numberOfLines={isOpenRow ? undefined : 2} />
                      <Text style={[styles.qVerdict, { color: m.color }]}>{m.label}</Text>
                    </View>
                    {canExpand && <Ionicons name={isOpenRow ? 'chevron-up' : 'chevron-down'} size={16} color={c.textMuted} />}
                  </Pressable>
                  {isOpenRow && (
                    <View style={styles.detail}>
                      {q.imageHtml ? <QuestionFigure html={q.imageHtml} label={`Abbildung zu Frage ${q.number}`} /> : null}
                      {q.type !== 'open' && (
                        <>
                          <Text style={styles.detailLine}>
                            <Text style={styles.detailKey}>Deine Antwort: </Text>
                            {given.length ? given.join(', ') : 'keine'}
                          </Text>
                          <Text style={styles.detailLine}>
                            <Text style={styles.detailKey}>Richtig: </Text>
                            {q.correct.length ? q.correct.join(', ') : 'keine Aussage trifft zu'}
                          </Text>
                        </>
                      )}
                      {explanation ? (
                        <Text style={styles.detailLine}>
                          <Text style={styles.detailKey}>{q.type === 'open' ? 'Musterlösung: ' : 'Erklärung: '}</Text>
                          {explanation}
                        </Text>
                      ) : null}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Actions */}
        <Pressable
          style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.6 }]}
          onPress={() => router.replace(`/exam/${params.examId}` as any)}
          accessibilityRole="button"
          accessibilityLabel="Prüfung wiederholen"
        >
          <Text style={styles.primaryBtnText}>Prüfung wiederholen</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.6 }]}
          onPress={() => router.replace('/(tabs)/exam' as any)}
          accessibilityRole="button"
          accessibilityLabel="Zur Prüfungsliste"
        >
          <Text style={styles.secondaryBtnText}>Zur Prüfungsliste</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ColorTokens) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.bg },
  content: { paddingHorizontal: GUTTER, gap: S.lg },

  scoreBlock: { alignItems: 'center', gap: S.sm, paddingVertical: S.lg },
  caption: { ...T.footnote, color: c.textSub, textTransform: 'uppercase' },
  gradeText: { ...T.largeTitle, fontSize: 64, lineHeight: 72, fontVariant: ['tabular-nums'] },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: S.xs,
    borderRadius: R.full, paddingHorizontal: S.md, paddingVertical: S.xs,
  },
  statusText: { ...T.headline },
  scoreLine: { ...T.body, color: c.text },
  duration: { ...T.footnote, color: c.textSub },

  group: { backgroundColor: c.surface, borderRadius: R.md, overflow: 'hidden' },
  rowSep: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: c.separator },
  infoRow: { padding: S.lg, gap: S.xs },
  infoTitle: { ...T.headline, color: c.text },
  infoMeta: { ...T.footnote, color: c.textSub },

  sectionTitle: { ...T.footnote, color: c.textSub, textTransform: 'uppercase', paddingHorizontal: S.lg, marginBottom: -S.sm },
  hint: { ...T.subhead, color: c.textSub },

  qRow: {
    flexDirection: 'row', alignItems: 'center', gap: S.md,
    minHeight: HIT, paddingHorizontal: S.lg, paddingVertical: S.md,
  },
  qText: { flex: 1, gap: S.xxs },
  qVerdict: { ...T.footnote, fontWeight: '600' },
  detail: { paddingHorizontal: S.lg, paddingBottom: S.md, paddingLeft: S.lg + 22 + S.md, gap: S.xs },
  detailLine: { ...T.subhead, color: c.text },
  detailKey: { color: c.textSub, fontWeight: '600' },

  primaryBtn: {
    minHeight: 50, borderRadius: R.md, backgroundColor: c.accent,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: S.lg,
  },
  primaryBtnText: { ...T.headline, color: c.onAccent },
  secondaryBtn: {
    minHeight: 50, borderRadius: R.md, backgroundColor: c.accentSoft,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: S.lg,
  },
  secondaryBtnText: { ...T.headline, color: c.accent },
});
