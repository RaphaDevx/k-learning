import { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { loadExam } from '../../data/examLoader';
import type { AnswerMap } from '../../types/exam';

function gradeColor(pct: number): string {
  if (pct >= 65) return '#4ade80';
  if (pct >= 55) return '#facc15';
  return '#f87171';
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
  const color = gradeColor(scorePct);

  useEffect(() => {
    if (!saved.current) {
      saved.current = true;
      saveResult();
    }
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

  async function showReview() {
    const data = await loadExam(params.examId);
    if (!data) {
      Alert.alert('Fehler', 'Prüfungsdaten nicht verfügbar.');
      return;
    }

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    for (const section of data.sections) {
      for (const q of section.questions) {
        const given = answers[q.id] ?? [];
        if (given.length === 0) { skippedCount++; continue; }
        const correctSet = new Set(q.correct);
        const givenSet = new Set(given);
        const allRight = q.correct.every(k => givenSet.has(k)) && given.every(k => correctSet.has(k));
        if (allRight) correctCount++;
        else wrongCount++;
      }
    }

    Alert.alert(
      'Auswertung',
      `Richtig: ${correctCount}\nFalsch: ${wrongCount}\nÜbersprungen: ${skippedCount}`,
      [{ text: 'OK' }]
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Score card */}
        <View style={[styles.scoreCard, { borderColor: color }]}>
          <Text style={[styles.gradeText, { color }]}>{params.grade}</Text>
          <Text style={[styles.scorePct, { color }]}>{scorePct}%</Text>
          <Text style={styles.gradeLabel}>{gradeLabel(scorePct)}</Text>
          <View style={styles.divider} />
          <Text style={styles.points}>{pointsEarned} / {totalPoints} Punkte</Text>
          <Text style={styles.duration}>Dauer: {formatDuration(durationSeconds)}</Text>
        </View>

        {/* Exam info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>{params.title}</Text>
          <Text style={styles.infoCourse}>{params.course}</Text>
          <Text style={styles.infoDate}>
            {new Date(params.takenAt).toLocaleDateString('de-CH', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
            })}
          </Text>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.reviewBtn} onPress={showReview}>
          <Text style={styles.reviewBtnText}>Schnellauswertung</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => router.replace(`/exam/${params.examId}` as any)}
        >
          <Text style={styles.retryBtnText}>Wiederholen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeBtn} onPress={() => router.replace('/(tabs)/exam' as any)}>
          <Text style={styles.homeBtnText}>Zur Prüfungsliste</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  content: { padding: 24, paddingTop: 64, paddingBottom: 48, gap: 16 },

  scoreCard: {
    backgroundColor: '#1f2937', borderRadius: 20,
    padding: 32, alignItems: 'center', borderWidth: 2, gap: 6,
  },
  gradeText: { fontSize: 56, fontWeight: '900', lineHeight: 64 },
  scorePct: { fontSize: 24, fontWeight: '800' },
  gradeLabel: { color: '#9ca3af', fontSize: 15, marginTop: 4 },
  divider: { height: 1, backgroundColor: '#374151', width: '100%', marginVertical: 12 },
  points: { color: '#e5e7eb', fontSize: 16, fontWeight: '600' },
  duration: { color: '#6b7280', fontSize: 13 },

  infoCard: { backgroundColor: '#1f2937', borderRadius: 14, padding: 16 },
  infoTitle: { color: '#f9fafb', fontSize: 16, fontWeight: '700' },
  infoCourse: { color: '#9ca3af', fontSize: 13, marginTop: 4 },
  infoDate: { color: '#6b7280', fontSize: 12, marginTop: 4 },

  reviewBtn: {
    backgroundColor: '#374151', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
  },
  reviewBtnText: { color: '#e5e7eb', fontWeight: '600', fontSize: 15 },

  retryBtn: {
    backgroundColor: '#4f46e5', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
  },
  retryBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  homeBtn: {
    backgroundColor: 'transparent', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
  },
  homeBtnText: { color: '#6b7280', fontWeight: '600', fontSize: 15 },
});
