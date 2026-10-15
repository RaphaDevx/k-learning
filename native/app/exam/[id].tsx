import { useEffect, useState, useRef, useMemo } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet,
  ActivityIndicator, Alert, BackHandler,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QuestionFigure from '../../components/QuestionFigure';
import { loadExam } from '../../data/examLoader';
import type { ExamData, ExamQuestion, ExamSection, AnswerMap } from '../../types/exam';
import { useColors, T, S, R, GUTTER, HIT } from '../../constants/theme';
import RichText from '../../components/RichText';
import type { ColorTokens } from '../../constants/theme';

function scoreExam(data: ExamData, answers: AnswerMap): { earned: number; total: number; pct: number } {
  const rules = data.scoringRules;
  let earned = 0;
  let total = 0;

  for (const section of data.sections) {
    for (const q of section.questions) {
      // Open questions are self-assessed and not part of the automatic score.
      if (q.type === 'open') continue;
      total += q.points;
      const given = answers[q.id] ?? [];

      if (q.type === 'single_choice') {
        if (given.length === 0) continue;
        if (given[0] === q.correct[0]) earned += q.points;
        else earned += rules.single_choice.wrong;
      } else if (q.type === 'multiple_choice') {
        // An empty `correct` means "no statement is true": leaving it blank is right.
        if (given.length === 0 && q.correct.length > 0) continue;
        const correctSet = new Set(q.correct);
        const givenSet = new Set(given);
        const allRight = q.correct.every(k => givenSet.has(k)) && given.every(k => correctSet.has(k));
        if (allRight) earned += q.points;
        else earned += rules.multiple_choice.anyWrong;
      }
    }
  }

  const pct = total > 0 ? Math.round((earned / total) * 100) : 0;
  return { earned, total, pct };
}

function gradeFromPct(pct: number): string {
  const g = Math.max(1, Math.min(6, 1 + 5 * (pct / 100)));
  return (Math.round(g * 2) / 2).toFixed(1);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function ExamScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const insets = useSafeAreaInsets();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (id) loadExamData(id);
  }, [id]);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!submitted) {
        confirmExit();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [submitted]);

  async function loadExamData(examId: string) {
    const data = await loadExam(examId);
    if (!data) {
      Alert.alert('Fehler', 'Prüfungsdaten nicht gefunden.', [{ text: 'OK', onPress: () => router.back() }]);
      return;
    }
    setExamData(data);
    setSecondsLeft(data.durationMinutes * 60);
    setLoading(false);
    startTimeRef.current = Date.now();
    startTimer(data.durationMinutes * 60);
  }

  function startTimer(totalSeconds: number) {
    let remaining = totalSeconds;
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        handleSubmit(true);
      }
    }, 1000);
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function confirmExit() {
    Alert.alert('Prüfung beenden?', 'Dein Fortschritt geht verloren.', [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Beenden', style: 'destructive', onPress: () => router.back() },
    ]);
  }

  function toggleAnswer(questionId: string, key: string, isMultiple: boolean) {
    setAnswers(prev => {
      const current = prev[questionId] ?? [];
      if (isMultiple) {
        return {
          ...prev,
          [questionId]: current.includes(key)
            ? current.filter(k => k !== key)
            : [...current, key],
        };
      } else {
        return { ...prev, [questionId]: [key] };
      }
    });
  }

  function handleSubmit(autoSubmit = false) {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!autoSubmit) {
      Alert.alert('Prüfung abgeben?', 'Du kannst danach keine Antworten mehr ändern.', [
        { text: 'Weiterarbeiten', style: 'cancel', onPress: () => startTimer(secondsLeft) },
        { text: 'Abgeben', style: 'destructive', onPress: () => submitExam() },
      ]);
    } else {
      submitExam();
    }
  }

  function submitExam() {
    if (!examData) return;
    setSubmitted(true);
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
    const score = scoreExam(examData, answers);
    const grade = gradeFromPct(score.pct);

    router.replace({
      pathname: '/exam/results' as any,
      params: {
        examId: examData.id,
        title: examData.title,
        course: examData.course,
        scorePct: score.pct,
        pointsEarned: score.earned,
        totalPoints: score.total,
        grade,
        answers: JSON.stringify(answers),
        takenAt: new Date().toISOString(),
        durationSeconds,
      },
    });
  }

  function navigateQuestion(direction: 'next' | 'prev') {
    if (!examData) return;
    const section = examData.sections[currentSection];
    if (direction === 'next') {
      if (currentQuestion < section.questions.length - 1) {
        setCurrentQuestion(q => q + 1);
      } else if (currentSection < examData.sections.length - 1) {
        setCurrentSection(s => s + 1);
        setCurrentQuestion(0);
      }
    } else {
      if (currentQuestion > 0) {
        setCurrentQuestion(q => q - 1);
      } else if (currentSection > 0) {
        const prevSection = examData.sections[currentSection - 1];
        setCurrentSection(s => s - 1);
        setCurrentQuestion(prevSection.questions.length - 1);
      }
    }
  }

  function totalQuestionIndex(): { current: number; total: number } {
    if (!examData) return { current: 0, total: 0 };
    let current = 0;
    let total = 0;
    for (let s = 0; s < examData.sections.length; s++) {
      const qs = examData.sections[s].questions.length;
      if (s < currentSection) current += qs;
      else if (s === currentSection) current += currentQuestion;
      total += qs;
    }
    return { current: current + 1, total };
  }

  function isLastQuestion(): boolean {
    if (!examData) return false;
    return (
      currentSection === examData.sections.length - 1 &&
      currentQuestion === examData.sections[currentSection].questions.length - 1
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={c.textSub} size="large" />
        <Text style={styles.loadingText}>Prüfung wird geladen…</Text>
      </View>
    );
  }

  if (!examData) return null;

  const section = examData.sections[currentSection];
  const question = section.questions[currentQuestion];
  const given = answers[question.id] ?? [];
  const isOpen = question.type === 'open';
  const isMultiple = question.type === 'multiple_choice';
  const progress = totalQuestionIndex();
  const timerWarn = secondsLeft < 300;
  const isFirst = currentSection === 0 && currentQuestion === 0;
  const modelAnswer = question.modelAnswer ?? question.explanation;
  const showModel = !!revealed[question.id];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + S.sm }]}>
        <Pressable
          onPress={confirmExit}
          style={({ pressed }) => [styles.endBtn, pressed && { opacity: 0.6 }]}
          accessibilityRole="button"
          accessibilityLabel="Prüfung beenden"
        >
          <Text style={styles.endBtnText}>Beenden</Text>
        </Pressable>

        <Text style={styles.progressText} accessibilityLabel={`Frage ${progress.current} von ${progress.total}`}>
          Frage {progress.current} von {progress.total}
        </Text>

        <Text
          style={[styles.timer, timerWarn && styles.timerWarn]}
          accessibilityRole="timer"
          accessibilityLabel={`Verbleibende Zeit ${formatTime(Math.max(0, secondsLeft))}`}
        >
          {formatTime(Math.max(0, secondsLeft))}
        </Text>
      </View>

      {/* Progress bar */}
      <View
        style={styles.progressBar}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: progress.total, now: progress.current }}
      >
        <View style={[styles.progressFill, { width: `${(progress.current / progress.total) * 100}%` as any }]} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Section context */}
        {section.context && currentQuestion === 0 && (
          <View style={styles.contextBox}>
            <Text style={styles.contextText}>{section.context}</Text>
          </View>
        )}

        {/* Section header */}
        <Text style={styles.sectionLabel}>{section.title}</Text>

        {/* Question */}
        <View style={styles.questionText}><RichText text={question.text} variant="headline" /></View>
        {question.imageHtml ? (
          <View style={{ marginBottom: S.md }}>
            <QuestionFigure html={question.imageHtml} label={`Abbildung zu Frage ${question.number}`} />
          </View>
        ) : null}
        <Text style={styles.questionMeta}>
          {isOpen
            ? 'Offene Frage — selbst bewerten'
            : `${isMultiple ? 'Mehrere Antworten möglich' : 'Eine Antwort'} · ${question.points} Pkt`}
        </Text>

        {isOpen ? (
          <View style={styles.openBox}>
            {showModel ? (
              <View style={styles.modelBox}>
                <Text style={styles.modelLabel}>Musterlösung</Text>
                <Text style={styles.modelText}>{modelAnswer || 'Keine Musterlösung hinterlegt.'}</Text>
              </View>
            ) : (
              <Pressable
                onPress={() => setRevealed(prev => ({ ...prev, [question.id]: true }))}
                style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.6 }]}
                accessibilityRole="button"
                accessibilityLabel="Musterlösung zeigen"
              >
                <Ionicons name="eye-outline" size={20} color={c.accent} />
                <Text style={styles.secondaryBtnText}>Musterlösung zeigen</Text>
              </Pressable>
            )}
          </View>
        ) : (
          <View style={styles.choices}>
            {question.choices.map(choice => {
              const selected = given.includes(choice.key);
              const icon = isMultiple
                ? (selected ? 'checkbox' : 'square-outline')
                : (selected ? 'radio-button-on' : 'radio-button-off');
              return (
                <Pressable
                  key={choice.key}
                  style={({ pressed }) => [
                    styles.choice,
                    selected && styles.choiceSelected,
                    pressed && { opacity: 0.6 },
                  ]}
                  onPress={() => toggleAnswer(question.id, choice.key, isMultiple)}
                  accessibilityRole={isMultiple ? 'checkbox' : 'radio'}
                  accessibilityState={isMultiple ? { checked: selected } : { selected }}
                  accessibilityLabel={`${choice.key}. ${choice.text}`}
                >
                  <Ionicons name={icon} size={24} color={selected ? c.accent : c.textSub} />
                  <Text style={styles.choiceKey}>{choice.key}</Text>
                  <View style={styles.choiceText}><RichText text={choice.text} /></View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Navigation */}
      <View style={[styles.nav, { paddingBottom: Math.max(insets.bottom, S.lg) }]}>
        <Pressable
          style={({ pressed }) => [styles.navBtn, isFirst && styles.navBtnDisabled, pressed && { opacity: 0.6 }]}
          onPress={() => navigateQuestion('prev')}
          disabled={isFirst}
          accessibilityRole="button"
          accessibilityLabel="Vorherige Frage"
          accessibilityState={{ disabled: isFirst }}
        >
          <Text style={styles.navBtnText}>Zurück</Text>
        </Pressable>

        {isLastQuestion() ? (
          <Pressable
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.6 }]}
            onPress={() => handleSubmit(false)}
            accessibilityRole="button"
            accessibilityLabel="Prüfung abgeben"
          >
            <Text style={styles.primaryBtnText}>Abgeben</Text>
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.6 }]}
            onPress={() => navigateQuestion('next')}
            accessibilityRole="button"
            accessibilityLabel="Nächste Frage"
          >
            <Text style={styles.primaryBtnText}>Weiter</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const makeStyles = (c: ColorTokens) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.bg },
  center: { flex: 1, backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center', gap: S.md },
  loadingText: { ...T.subhead, color: c.textSub },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: GUTTER, paddingBottom: S.sm, gap: S.sm,
  },
  endBtn: { minHeight: HIT, minWidth: HIT, justifyContent: 'center' },
  endBtnText: { ...T.body, color: c.accent },
  progressText: { ...T.footnote, color: c.textSub, flexShrink: 1, textAlign: 'center' },
  timer: {
    ...T.headline, color: c.text, minWidth: 56, textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  timerWarn: { color: c.red },

  progressBar: { height: 4, backgroundColor: c.separator, marginHorizontal: GUTTER, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: c.accent, borderRadius: 2 },

  scroll: { flex: 1 },
  scrollContent: { padding: GUTTER, paddingBottom: S.xxl },

  contextBox: {
    backgroundColor: c.accentSoft, borderRadius: R.md, padding: S.md, marginBottom: S.lg,
  },
  contextText: { ...T.subhead, color: c.textSub },

  sectionLabel: { ...T.footnote, color: c.textSub, marginBottom: S.sm, textTransform: 'uppercase' },
  questionText: { marginBottom: S.xs },
  questionMeta: { ...T.footnote, color: c.textSub, marginBottom: S.lg },

  choices: { gap: S.sm },
  choice: {
    flexDirection: 'row', alignItems: 'center', gap: S.md,
    minHeight: HIT + S.md, backgroundColor: c.surface, borderRadius: R.md,
    paddingHorizontal: S.lg, paddingVertical: S.md,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  choiceSelected: { borderColor: c.accent, backgroundColor: c.accentSoft },
  choiceKey: { ...T.subhead, color: c.textSub, fontWeight: '600', minWidth: 16 },
  choiceText: { flex: 1 },

  openBox: { gap: S.md },
  secondaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: S.sm,
    minHeight: 50, borderRadius: R.md, backgroundColor: c.accentSoft, paddingHorizontal: S.lg,
  },
  secondaryBtnText: { ...T.headline, color: c.accent },
  modelBox: { backgroundColor: c.surface, borderRadius: R.md, padding: S.lg, gap: S.xs },
  modelLabel: { ...T.footnote, color: c.textSub, textTransform: 'uppercase' },
  modelText: { ...T.body, color: c.text },

  nav: {
    flexDirection: 'row', gap: S.md, paddingHorizontal: GUTTER, paddingTop: S.md,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: c.separator,
  },
  navBtn: {
    flex: 1, minHeight: 50, borderRadius: R.md, justifyContent: 'center',
    backgroundColor: c.accentSoft, alignItems: 'center',
  },
  navBtnDisabled: { opacity: 0.4 },
  navBtnText: { ...T.headline, color: c.accent },
  primaryBtn: {
    flex: 2, minHeight: 50, borderRadius: R.md, justifyContent: 'center',
    backgroundColor: c.accent, alignItems: 'center',
  },
  primaryBtnText: { ...T.headline, color: c.onAccent },
});
