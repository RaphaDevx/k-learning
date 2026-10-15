import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ExamData } from '../types/exam';
import { supabase } from '../lib/supabase';

// The app ships no exam content. Exams live in Supabase (k_exams.content) and are
// cached on the device per content_version, so a started exam also works offline.
const CACHE_PREFIX = '@klearning_exam:';

interface CachedExam { version: number; data: ExamData }

async function readCache(id: string): Promise<CachedExam | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_PREFIX + id);
    return raw ? (JSON.parse(raw) as CachedExam) : null;
  } catch {
    return null;
  }
}

export async function loadExam(id: string): Promise<ExamData | null> {
  const cached = await readCache(id);

  const { data, error } = await supabase
    .from('k_exams')
    .select('content,content_version')
    .eq('id', id)
    .maybeSingle();

  if (error || !data?.content) return cached?.data ?? null;
  if (cached && cached.version === data.content_version) return cached.data;

  const exam = data.content as ExamData;
  AsyncStorage.setItem(
    CACHE_PREFIX + id,
    JSON.stringify({ version: data.content_version, data: exam } satisfies CachedExam),
  ).catch(() => {});
  return exam;
}
