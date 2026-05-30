import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '../../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setLoading(true);
    try {
      // makeRedirectUri() auto-detects environment:
      // Expo Go → exp://192.168.x.x:8081/--/auth/callback
      // Standalone → k-learning://auth/callback (via app.json scheme)
      const redirectTo = makeRedirectUri({ path: 'auth/callback' });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo, skipBrowserRedirect: true },
      });

      if (error || !data.url) throw error ?? new Error('No OAuth URL');

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

      if (result.type === 'success' && result.url) {
        const params = result.url.includes('?')
          ? result.url.split('?')[1]
          : result.url.split('#')[1] ?? '';
        await supabase.auth.exchangeCodeForSession(params);
      }
    } catch (e) {
      console.warn('Google sign-in error:', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>⚡</Text>
        <Text style={styles.title}>K-Learning</Text>
        <Text style={styles.subtitle}>HSG · Lern wie auf Instagram</Text>
      </View>

      <TouchableOpacity style={styles.googleBtn} onPress={signInWithGoogle} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleText}>Mit Google anmelden</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.hint}>Nur für HSG-Studenten</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 4,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285f4',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 12,
    width: '100%',
    minHeight: 54,
  },
  googleIcon: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  googleText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  hint: {
    color: '#6b7280',
    fontSize: 13,
  },
});
