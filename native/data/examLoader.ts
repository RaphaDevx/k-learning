import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import type { ExamData } from '../types/exam';
import { supabase } from '../lib/supabase';

// The app ships no exam content. Exams with `content_key` (BuSta) are public-part files in a private
// R2 bucket, served by the entitlement endpoint with the Supabase JWT; the file's SHA-256 is checked
// against k_exams.content_hash. Model answers come separately, only after a saved attempt. Older exams
// still live in k_exams.content. Everything is cached on the device so a started exam works offline.
export const API_BASE = 'https://k-learning.pages.dev';
const CONTENT_BASE = `${API_BASE}/exam-content`;
const CACHE_PREFIX = '@klearning_exam:';
const SPLIT_PREFIX = '@klearning_exam_split:';
const SOLUTIONS_PREFIX = '@klearning_exam_sol:';

interface CachedExam { version: number; data: ExamData }
interface CachedSplit { hash: string; until: string | null; data: ExamData }
export interface Solution { modelAnswer?: string | null; explanation?: string | null }
export type SolutionMap = Record<string, Solution>;

export class ExamAccessError extends Error {}

async function readJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

const writeJson = (key: string, value: unknown) =>
  AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {});

const usable = (until: string | null | undefined) => !until || Date.now() <= Date.parse(until);

export async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface ExamPointer { id: string; contentKey: string; contentHash: string }

async function loadSplitExam(ptr: ExamPointer): Promise<ExamData> {
  const cacheKey = SPLIT_PREFIX + ptr.id;
  const cached = await readJson<CachedSplit>(cacheKey);
  const cacheOk = !!cached && usable(cached.until);
  const headers = await authHeader();
  if (!headers.Authorization) {
    if (cacheOk) return cached!.data;
    throw new ExamAccessError('Bitte anmelden, um die Prüfung zu laden.');
  }
  let response: Response;
  try {
    response = await fetch(`${CONTENT_BASE}/${ptr.contentKey}`, { headers });
  } catch {
    // offline / service unreachable: last entitled copy
    if (cacheOk) return cached!.data;
    throw new Error('Prüfung ist offline noch nicht geladen. Einmal mit Verbindung öffnen.');
  }
  if (response.status === 401 || response.status === 403) {
    await AsyncStorage.multiRemove([cacheKey, SOLUTIONS_PREFIX + ptr.id]).catch(() => {});
    throw new ExamAccessError('Für diese Prüfung ist keine Berechtigung vorhanden.');
  }
  if (!response.ok) {
    if (cacheOk) return cached!.data;
    throw new Error(`Inhalts-Dienst: HTTP ${response.status}`);
  }
  const text = await response.text();
  const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, text);
  if (digest !== ptr.contentHash) throw new Error('Prüfungsinhalt ist unvollständig oder veraltet (Prüfsumme).');
  const data = { ...(JSON.parse(text) as ExamData), contentKey: ptr.contentKey };
  await writeJson(cacheKey, { hash: ptr.contentHash, until: response.headers.get('X-Entitlement-Until'), data } satisfies CachedSplit);
  return data;
}

async function loadLegacyExam(id: string): Promise<ExamData | null> {
  const cached = await readJson<CachedExam>(CACHE_PREFIX + id);
  const { data, error } = await supabase
    .from('k_exams')
    .select('content,content_version')
    .eq('id', id)
    .maybeSingle();

  if (error || !data?.content) return cached?.data ?? null;
  if (cached && cached.version === data.content_version) return cached.data;

  const exam = data.content as ExamData;
  writeJson(CACHE_PREFIX + id, { version: data.content_version, data: exam } satisfies CachedExam);
  return exam;
}

// Resolves the content pointer from k_exams (or its cached copy when offline), then loads accordingly.
export async function loadExam(id: string): Promise<ExamData | null> {
  const { data, error } = await supabase
    .from('k_exams')
    .select('content_key,content_hash')
    .eq('id', id)
    .maybeSingle();
  let ptr: ExamPointer | null = data?.content_key && data?.content_hash
    ? { id, contentKey: data.content_key, contentHash: data.content_hash } : null;
  if (!ptr && error) {
    const cached = await readJson<CachedSplit>(SPLIT_PREFIX + id);
    if (cached) ptr = { id, contentKey: cached.data.contentKey ?? '', contentHash: cached.hash };
  }
  if (ptr?.contentKey) return loadSplitExam(ptr);
  return loadLegacyExam(id);
}

// Model answers and explanations: only after the attempt is saved (the server checks). Cached for offline review.
export async function loadSolutions(examId: string): Promise<SolutionMap | null> {
  try {
    const response = await fetch(`${API_BASE}/api/exam-solutions`, {
      method: 'POST',
      headers: { ...(await authHeader()), 'Content-Type': 'application/json' },
      body: JSON.stringify({ examId }),
    });
    if (response.ok) {
      const solutions = (await response.json()).solutions as SolutionMap;
      await writeJson(SOLUTIONS_PREFIX + examId, solutions);
      return solutions;
    }
  } catch { /* offline: cached copy */ }
  return readJson<SolutionMap>(SOLUTIONS_PREFIX + examId);
}

export function applySolutions(exam: ExamData, solutions: SolutionMap): ExamData {
  return {
    ...exam,
    sections: exam.sections.map(sec => ({
      ...sec,
      questions: sec.questions.map(q => {
        const sol = solutions[q.id];
        return sol ? { ...q, modelAnswer: sol.modelAnswer ?? q.modelAnswer, explanation: sol.explanation ?? q.explanation } : q;
      }),
    })),
  };
}
