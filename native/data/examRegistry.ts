import type { ExamMeta } from '../types/exam';
import { supabase } from '../lib/supabase';
import { isExamBundled } from './examLoader';

// Fallback registry — used when Supabase is unavailable
const FALLBACK_REGISTRY: ExamMeta[] = [
  {
    id: 'makro2-probeklausur-fs26',
    title: 'Probeklausur FS26',
    course: 'MakroII',
    courseColor: '#059669',
    durationMinutes: 90,
    totalPoints: 90,
    available: true,
    bundled: true,
  },
  {
    id: 'makro2-probeklausur-b',
    title: 'Probeklausur B (Juli 2026)',
    course: 'MakroII',
    courseColor: '#059669',
    durationMinutes: 90,
    totalPoints: 90,
    available: true,
    bundled: true,
  },
  {
    id: 'om-fs26',
    title: 'Probeprüfung FS 2026',
    course: 'OM',
    courseColor: '#7c3aed',
    durationMinutes: 90,
    totalPoints: 60,
    available: true,
    bundled: false,
  },
  {
    id: 'om-hs24',
    title: 'Prüfung HS 2024',
    course: 'OM',
    courseColor: '#7c3aed',
    durationMinutes: 90,
    totalPoints: 60,
    available: true,
    bundled: false,
  },
  {
    id: 'om-hs23',
    title: 'Prüfung HS 2023',
    course: 'OM',
    courseColor: '#7c3aed',
    durationMinutes: 90,
    totalPoints: 60,
    available: true,
    bundled: false,
  },
  {
    id: 'stat-pk1',
    title: 'Probeklausur 1',
    course: 'Statistik',
    courseColor: '#0284c7',
    durationMinutes: 90,
    totalPoints: 60,
    available: true,
    bundled: false,
  },
  {
    id: 'stat-pk2',
    title: 'Probeklausur 2',
    course: 'Statistik',
    courseColor: '#0284c7',
    durationMinutes: 90,
    totalPoints: 60,
    available: true,
    bundled: false,
  },
  {
    id: 'bwl-b-fs25',
    title: 'BWL B — FS 2025',
    course: 'BWL',
    courseColor: '#ea580c',
    durationMinutes: 90,
    totalPoints: 60,
    available: true,
    bundled: false,
  },
];

// Course config used for section headers in the exam tab
export const COURSE_CONFIG: Record<string, { label: string; color: string }> = {
  MakroII:    { label: 'Makro II',              color: '#059669' },
  OM:         { label: 'Operations Management', color: '#7c3aed' },
  Statistik:  { label: 'Statistik',             color: '#0284c7' },
  ESF:        { label: 'ESF',                   color: '#dc2626' },
  BWL:        { label: 'BWL',                   color: '#ea580c' },
  EnglischC1: { label: 'Englisch C1',           color: '#0891b2' },
  IPR:        { label: 'Internat. Privatrecht',  color: '#4f46e5' },
};

// Load exam list from Supabase k_exams table.
// Falls back to FALLBACK_REGISTRY when unavailable.
export async function loadExamRegistry(): Promise<ExamMeta[]> {
  try {
    const { data, error } = await supabase
      .from('k_exams')
      .select('id,title,course,course_color,duration_minutes,total_points,storage_path,active')
      .eq('active', true)
      .order('sort_order');

    if (error || !data || data.length === 0) return FALLBACK_REGISTRY;

    return data.map(row => ({
      id:              row.id,
      title:           row.title,
      course:          row.course,
      courseColor:     row.course_color,
      durationMinutes: row.duration_minutes,
      totalPoints:     row.total_points,
      available:       true,
      bundled:         isExamBundled(row.id) || !row.storage_path,
    }));
  } catch {
    return FALLBACK_REGISTRY;
  }
}

// Synchronous fallback for screens that can't await (use sparingly)
export const EXAM_REGISTRY = FALLBACK_REGISTRY;

export function getExamMeta(id: string): ExamMeta | undefined {
  return FALLBACK_REGISTRY.find(e => e.id === id);
}

export function getExamsByCategory(registry = FALLBACK_REGISTRY): Record<string, ExamMeta[]> {
  const grouped: Record<string, ExamMeta[]> = {};
  for (const exam of registry) {
    if (!grouped[exam.course]) grouped[exam.course] = [];
    grouped[exam.course].push(exam);
  }
  return grouped;
}
