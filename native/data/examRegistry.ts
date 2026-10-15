import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ExamMeta } from '../types/exam';
import { supabase } from '../lib/supabase';

// Exam list comes from Supabase k_exams. The last successful list is cached so the
// Prüfungen tab still renders offline; there is no hard-coded fallback content.
const CACHE_KEY = '@klearning_exam_registry';

export async function loadExamRegistry(): Promise<ExamMeta[]> {
  const { data, error } = await supabase
    .from('k_exams')
    .select('id,title,course,course_color,duration_minutes,total_points,has_content')
    .eq('active', true)
    .order('sort_order');

  if (error || !data) {
    try {
      const raw = await AsyncStorage.getItem(CACHE_KEY);
      return raw ? (JSON.parse(raw) as ExamMeta[]) : [];
    } catch {
      return [];
    }
  }

  const registry: ExamMeta[] = data.map(row => ({
    id:              row.id,
    title:           row.title,
    course:          row.course,
    courseColor:     row.course_color,
    durationMinutes: row.duration_minutes,
    totalPoints:     row.total_points,
    available:       row.has_content,
  }));
  AsyncStorage.setItem(CACHE_KEY, JSON.stringify(registry)).catch(() => {});
  return registry;
}

export function getExamsByCategory(registry: ExamMeta[]): Record<string, ExamMeta[]> {
  const grouped: Record<string, ExamMeta[]> = {};
  for (const exam of registry) {
    (grouped[exam.course] ??= []).push(exam);
  }
  return grouped;
}
