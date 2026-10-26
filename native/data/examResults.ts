import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { supabase } from '../lib/supabase';
import { API_BASE, authHeader } from './examLoader';
import type { AnswerMap, ExamData } from '../types/exam';

// Result rows of paywalled (open-question) exams use the same shape as the web client. A row that
// cannot be saved (offline) is queued on the device and sent when the app is online again.
const PENDING_RESULTS_STORE = '@klearning_pending_results_v1';

export interface SavedAnswer {
  question_id: string;
  topics: string[];
  is_correct: boolean | null;
  earned: number | null;
  max_pts: number;
  user_answer: string | null;
  model_answer: null;
  question_text: string;
  ai_feedback?: string;
  ai_assessment?: Grade;
  grading_status?: string;
}

export interface Grade {
  earned: number | null;
  status?: string;
  feedback?: string;
  reviewReason?: string;
  proposedEarned?: number | null;
  notice?: string;
  criteria?: { id: string; earned: number; reason: string; missing?: string }[];
}

export interface ResultRow {
  id: string;
  user_id: string;
  exam_id: string;
  course: string;
  taken_at: string;
  score_pct: number | null;
  grading_status: 'pending' | 'graded';
  answers: SavedAnswer[];
}

export function buildAnswers(exam: ExamData, given: AnswerMap): SavedAnswer[] {
  return exam.sections.flatMap(sec => sec.questions).map(q => {
    const text = (given[q.id] ?? []).join(',').trim();
    return {
      question_id: q.id, topics: [], is_correct: null, earned: null, max_pts: q.points,
      user_answer: text || null, model_answer: null, question_text: q.text,
    };
  });
}

async function readQueue(): Promise<ResultRow[]> {
  try { return JSON.parse(await AsyncStorage.getItem(PENDING_RESULTS_STORE) || '[]'); } catch { return []; }
}

async function queueRow(row: ResultRow) {
  const queue = (await readQueue()).filter(r => r.id !== row.id);
  await AsyncStorage.setItem(PENDING_RESULTS_STORE, JSON.stringify([...queue, row])).catch(() => {});
}

// Returns true when stored in Supabase, false when queued for later.
export async function saveResultRow(exam: ExamData, given: AnswerMap, takenAt: string): Promise<{ row: ResultRow | null; saved: boolean }> {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) return { row: null, saved: false };
  const answers = buildAnswers(exam, given);
  const row: ResultRow = {
    id: Crypto.randomUUID(), user_id: user.id, exam_id: exam.id, course: exam.course, taken_at: takenAt,
    score_pct: null, grading_status: 'pending', answers,
  };
  const { error } = await supabase.from('exam_results').insert(row);
  if (error && error.code !== '23505') { await queueRow(row); return { row, saved: false }; }
  return { row, saved: true };
}

export async function flushPendingResults(): Promise<number> {
  const queue = await readQueue();
  if (!queue.length) return 0;
  const remaining: ResultRow[] = [];
  for (const row of queue) {
    const { error } = await supabase.from('exam_results').insert(row);
    if (error && error.code !== '23505') remaining.push(row);
  }
  await AsyncStorage.setItem(PENDING_RESULTS_STORE, JSON.stringify(remaining)).catch(() => {});
  return queue.length - remaining.length;
}

export async function gradeAnswer(examId: string, questionId: string, answer: string): Promise<Grade> {
  const response = await fetch(`${API_BASE}/api/grade-answer`, {
    method: 'POST',
    headers: { ...(await authHeader()), 'Content-Type': 'application/json' },
    body: JSON.stringify({ examId, questionId, answer }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'grading_unavailable');
  return data as Grade;
}

export function totals(answers: SavedAnswer[], grades: Record<string, Grade>) {
  let total = 0, max = 0, pending = 0;
  for (const a of answers) {
    max += a.max_pts;
    if (!a.user_answer?.trim()) continue;
    const g = grades[a.question_id];
    if (g?.earned == null) pending++; else total += g.earned;
  }
  return { total, max, pending, pct: pending || !max ? null : Math.round(total / max * 100) };
}

export async function persistGrades(row: ResultRow, grades: Record<string, Grade>) {
  const t = totals(row.answers, grades);
  const answers = row.answers.map(a => {
    const g = grades[a.question_id];
    return g ? { ...a, earned: g.earned, ai_feedback: g.feedback, ai_assessment: g, grading_status: g.status,
      is_correct: g.earned == null ? null : g.earned >= a.max_pts } : a;
  });
  await supabase.from('exam_results').update({
    score_pct: t.pct, grading_status: t.pending ? 'pending' : 'graded', answers,
  }).eq('id', row.id).eq('user_id', row.user_id);
}
