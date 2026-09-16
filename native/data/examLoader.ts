import type { ExamData } from '../types/exam';
import { supabase } from '../lib/supabase';

const BUNDLED: Record<string, () => ExamData> = {
  'makro2-probeklausur-fs26': () => require('./exams/makro2-probeklausur-fs26-data.json'),
  'makro2-probeklausur-b':    () => require('./exams/makro2-probeklausur-b-data.json'),
};

export async function loadExam(id: string): Promise<ExamData | null> {
  // 1. Try bundled first (zero latency, works offline)
  const loader = BUNDLED[id];
  if (loader) {
    try { return loader() as ExamData; } catch {}
  }

  // 2. Fetch from Supabase Storage (bucket: exams, path: {id}.json)
  try {
    const { data, error } = await supabase.storage
      .from('exams')
      .download(`${id}.json`);

    if (error || !data) return null;
    const text = await data.text();
    return JSON.parse(text) as ExamData;
  } catch {
    return null;
  }
}

export function isExamBundled(id: string): boolean {
  return id in BUNDLED;
}
