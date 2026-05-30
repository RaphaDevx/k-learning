import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle deep links for OAuth callback (k-learning://auth/callback?...)
  useEffect(() => {
    const handleUrl = async (url: string) => {
      if (url.includes('auth/callback') || url.includes('access_token') || url.includes('refresh_token')) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(
          url.split('?')[1] ?? ''
        );
        if (!error && data.session) router.replace('/(tabs)/');
      }
    };

    Linking.getInitialURL().then(url => { if (url) handleUrl(url); });
    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (session) {
      router.replace('/(tabs)/');
    } else {
      router.replace('/(auth)/login');
    }
  }, [ready, session]);

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
