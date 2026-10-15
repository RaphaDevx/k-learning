import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

// Course catalogue from Supabase k_courses. The app knows no course by name.
export interface CourseInfo {
  key: string;
  label: string;
  hex: string | null;
  icon: string | null;
}

const CACHE_KEY = '@klearning_courses';
let memo: Record<string, CourseInfo> | null = null;

export async function loadCourses(): Promise<Record<string, CourseInfo>> {
  const { data, error } = await supabase
    .from('k_courses')
    .select('key,label,hex,icon')
    .eq('active', true)
    .order('sort_order');

  if (error || !data) {
    if (memo) return memo;
    try {
      const raw = await AsyncStorage.getItem(CACHE_KEY);
      return raw ? (JSON.parse(raw) as Record<string, CourseInfo>) : {};
    } catch {
      return {};
    }
  }

  const fresh: Record<string, CourseInfo> = Object.fromEntries(data.map(c => [c.key, c as CourseInfo]));
  memo = fresh;
  AsyncStorage.setItem(CACHE_KEY, JSON.stringify(fresh)).catch(() => {});
  return fresh;
}

export function useCourses(): Record<string, CourseInfo> {
  const [courses, setCourses] = useState<Record<string, CourseInfo>>(memo ?? {});
  useEffect(() => {
    let alive = true;
    loadCourses().then(c => { if (alive) setCourses(c); });
    return () => { alive = false; };
  }, []);
  return courses;
}
