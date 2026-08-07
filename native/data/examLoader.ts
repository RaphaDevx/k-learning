import type { ExamData } from '../types/exam';

const BUNDLED: Record<string, () => ExamData> = {
  'makro2-probeklausur-fs26': () => require('./exams/makro2-probeklausur-fs26-data.json'),
  'makro2-probeklausur-b':    () => require('./exams/makro2-probeklausur-b-data.json'),
};

export async function loadExam(id: string): Promise<ExamData | null> {
  const loader = BUNDLED[id];
  if (loader) {
    try { return loader() as ExamData; }
    catch { return null; }
  }
  return null;
}

export function isExamBundled(id: string): boolean {
  return id in BUNDLED;
}
