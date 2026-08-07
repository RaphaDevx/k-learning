import { useEffect, useState, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, BackHandler,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { loadExam } from '../../data/examLoader';
import { getExamMeta } from '../../data/examRegistry';
import type { ExamData, ExamQuestion, ExamSection, AnswerMap } from '../../types/exam';

function scoreExam(data: ExamData, answers: AnswerMap): { earned: number; total: number; pct: number } {
  const rules = data.scoringRules;
  let earned = 0;
  let total = 0;

  for (const section of data.sections) {
    for (const q of section.questions) {
      total += q.points;
      const given = answers[q.id] ?? [];
      if (given.length === 0) continue;

      if (q.type === 'single_choice') {
        if (given[0] === q.correct[0]) earned += rules.single_choice.correct;
        else earned += rules.single_choice.wrong;
      } else if (q.type === 'multiple_choice') {
        const correctSet = new Set(q.correct);
        const givenSet = new Set(given);
        const allRight = q.correct.every(k => givenSet.has(k)) && given.every(k => correctSet.has(k));
        if (allRight) earned += rules.multiple_choice.allCorrect;
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
        Alert.alert('Prüfung abbrechen?', 'Dein Fortschritt geht verloren.', [
          { text: 'Weiter', style: 'cancel' },
          { text: 'Abbrechen', style: 'destructive', onPress: () => router.back() },
        ]);
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
    const meta = getExamMeta(id!);

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
        <ActivityIndicator color="#6366f1" size="large" />
        <Text style={styles.loadingText}>Prüfung wird geladen…</Text>
      </View>
    );
  }

  if (!examData) return null;

  const section = examData.sections[currentSection];
  const question = section.questions[currentQuestion];
  const given = answers[question.id] ?? [];
  const isMultiple = question.type === 'multiple_choice';
  const progress = totalQuestionIndex();
  const timerWarn = secondsLeft < 300;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          Alert.alert('Prüfung abbrechen?', 'Dein Fortschritt geht verloren.', [
            { text: 'Weiter', style: 'cancel' },
            { text: 'Abbrechen', style: 'destructive', onPress: () => router.back() },
          ]);
        }}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.progressText}>
          {progress.current} / {progress.total}
        </Text>

        <Text style={[styles.timer, timerWarn && styles.timerWarn]}>
          {formatTime(secondsLeft)}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
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
        <Text style={styles.questionText}>{question.text}</Text>
        <Text style={styles.questionMeta}>
          {isMultiple ? 'Mehrere Antworten möglich' : 'Eine Antwort'} · {question.points} Pkt
        </Text>

        {/* Choices */}
        <View style={styles.choices}>
          {question.choices.map(choice => {
            const selected = given.includes(choice.key);
            return (
              <TouchableOpacity
                key={choice.key}
                style={[styles.choice, selected && styles.choiceSelected]}
                onPress={() => toggleAnswer(question.id, choice.key, isMultiple)}
                activeOpacity={0.7}
              >
                <View style={[styles.choiceKey, selected && styles.choiceKeySelected]}>
                  <Text style={[styles.choiceKeyText, selected && styles.choiceKeyTextSelected]}>
                    {choice.key}
                  </Text>
                </View>
                <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>
                  {choice.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.navBtn, currentSection === 0 && currentQuestion === 0 && styles.navBtnDisabled]}
          onPress={() => navigateQuestion('prev')}
          disabled={currentSection === 0 && currentQuestion === 0}
        >
          <Text style={styles.navBtnText}>Zurück</Text>
        </TouchableOpacity>

        {isLastQuestion() ? (
          <TouchableOpacity style={styles.submitBtn} onPress={() => handleSubmit(false)}>
            <Text style={styles.submitBtnText}>Abgeben</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navBtnNext} onPress={() => navigateQuestion('next')}>
            <Text style={styles.navBtnNextText}>Weiter</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  center: { flex: 1, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: '#9ca3af', fontSize: 15 },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 56, paddingBottom: 12,
  },
  closeBtn: { color: '#9ca3af', fontSize: 20, width: 36 },
  progressText: { color: '#9ca3af', fontSize: 13 },
  timer: { color: '#e5e7eb', fontSize: 16, fontWeight: '700', minWidth: 50, textAlign: 'right' },
  timerWarn: { color: '#f87171' },

  progressBar: { height: 3, backgroundColor: '#1f2937', marginHorizontal: 16 },
  progressFill: { height: 3, backgroundColor: '#6366f1', borderRadius: 2 },

  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },

  contextBox: {
    backgroundColor: '#1e3a5f', borderRadius: 10, padding: 12, marginBottom: 16,
    borderLeftWidth: 3, borderLeftColor: '#3b82f6',
  },
  contextText: { color: '#bfdbfe', fontSize: 13, lineHeight: 20 },

  sectionLabel: { color: '#6b7280', fontSize: 12, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  questionText: { color: '#f9fafb', fontSize: 16, lineHeight: 24, fontWeight: '600', marginBottom: 6 },
  questionMeta: { color: '#6b7280', fontSize: 12, marginBottom: 20 },

  choices: { gap: 10 },
  choice: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: '#1f2937', borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: 'transparent',
  },
  choiceSelected: { borderColor: '#6366f1', backgroundColor: '#1e1b4b' },
  choiceKey: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: '#374151', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  choiceKeySelected: { backgroundColor: '#6366f1' },
  choiceKeyText: { color: '#9ca3af', fontSize: 13, fontWeight: '700' },
  choiceKeyTextSelected: { color: '#fff' },
  choiceText: { color: '#d1d5db', fontSize: 14, lineHeight: 20, flex: 1, paddingTop: 4 },
  choiceTextSelected: { color: '#fff' },

  nav: {
    flexDirection: 'row', gap: 12, padding: 16, paddingBottom: 32,
    borderTopWidth: 1, borderTopColor: '#1f2937',
  },
  navBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 12,
    backgroundColor: '#1f2937', alignItems: 'center',
  },
  navBtnDisabled: { opacity: 0.3 },
  navBtnText: { color: '#9ca3af', fontWeight: '600', fontSize: 15 },
  navBtnNext: {
    flex: 2, paddingVertical: 14, borderRadius: 12,
    backgroundColor: '#4f46e5', alignItems: 'center',
  },
  navBtnNextText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  submitBtn: {
    flex: 2, paddingVertical: 14, borderRadius: 12,
    backgroundColor: '#059669', alignItems: 'center',
  },
  submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
