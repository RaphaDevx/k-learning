import type { ExamMeta } from '../types/exam';

export const COURSE_CONFIG: Record<string, { label: string; color: string }> = {
  MakroII:    { label: 'Makro II',    color: '#059669' },
  OM:         { label: 'Operations Management', color: '#7c3aed' },
  Statistik:  { label: 'Statistik',   color: '#0284c7' },
  ESF:        { label: 'ESF',         color: '#dc2626' },
  BWL:        { label: 'BWL',         color: '#ea580c' },
  EnglischC1: { label: 'Englisch C1', color: '#0891b2' },
  IPR:        { label: 'Internat. Privatrecht', color: '#4f46e5' },
};

export const EXAM_REGISTRY: ExamMeta[] = [
  // MakroII — bundled JSON available
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
  // OM
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
  // Statistik
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
  // BWL
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

export function getExamMeta(id: string): ExamMeta | undefined {
  return EXAM_REGISTRY.find(e => e.id === id);
}

export function getExamsByCategory(): Record<string, ExamMeta[]> {
  const grouped: Record<string, ExamMeta[]> = {};
  for (const exam of EXAM_REGISTRY) {
    if (!grouped[exam.course]) grouped[exam.course] = [];
    grouped[exam.course].push(exam);
  }
  return grouped;
}
