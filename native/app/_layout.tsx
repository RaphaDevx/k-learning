import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { supabase } from '../lib/supabase';
import { CourseProvider } from '../lib/courseContext';
import type { Session } from '@supabase/supabase-js';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const router = useRouter();
  const segments = useSegments();
  const navState = useRootNavigationState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === undefined) return;
    if (!navState?.key) return;

    const inAuth = segments[0] === '(auth)';

    if (session && inAuth) {
      router.replace('/(tabs)/' as any);
    } else if (!session && !inAuth) {
      router.replace('/(auth)/login' as any);
    }
  }, [session, segments, navState?.key]);

  useEffect(() => {
    const handleUrl = async (url: string) => {
      if (!url.includes('auth/callback') && !url.includes('access_token') && !url.includes('refresh_token')) return;
      // Extract params from query string or hash fragment
      const paramStr = url.includes('?')
        ? url.split('?')[1]
        : url.split('#')[1] ?? '';
      if (!paramStr) return;
      // exchangeCodeForSession handles both PKCE (code=…) and implicit (access_token=…)
      await supabase.auth.exchangeCodeForSession(paramStr);
    };
    Linking.getInitialURL().then(url => { if (url) handleUrl(url); });
    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CourseProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="exam" options={{ presentation: 'fullScreenModal' }} />
          <Stack.Screen name="course" options={{ presentation: 'card', animation: 'slide_from_right' }} />
        </Stack>
      </CourseProvider>
    </GestureHandlerRootView>
  );
}
