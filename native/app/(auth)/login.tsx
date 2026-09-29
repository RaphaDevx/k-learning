import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, Platform, Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuthentication from 'expo-apple-authentication';
import { makeRedirectUri } from 'expo-auth-session';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { C, R, F } from '../../constants/theme';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);

  async function signInWithGoogle() {
    setLoadingGoogle(true);
    try {
      // Production: k-learning://auth/callback (deep link back into app)
      // Expo Go dev: exp://127.0.0.1:8081/--/auth/callback
      const redirectTo = makeRedirectUri({ scheme: 'k-learning', path: 'auth/callback' });
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
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(params);
        if (exchangeError) throw exchangeError;
      }
    } catch (e: any) {
      console.error('Google sign-in error:', e);
      Alert.alert('Anmeldung fehlgeschlagen', e?.message ?? 'Unbekannter Fehler');
    } finally {
      setLoadingGoogle(false);
    }
  }

  async function signInWithApple() {
    setLoadingApple(true);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('Apple hat kein Identity Token zurückgegeben');
      }

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

      if (error) throw error;

      if (!data.session) {
        throw new Error('Supabase hat keine Session erstellt. Prüfe ob com.raphael.klearning in den Apple Provider Client IDs eingetragen ist.');
      }

      // Name speichern (Apple gibt ihn nur beim ersten Login)
      if (credential.fullName?.givenName || credential.fullName?.familyName) {
        const fullName = [credential.fullName.givenName, credential.fullName.familyName]
          .filter(Boolean).join(' ');
        if (fullName) {
          await supabase.auth.updateUser({ data: { full_name: fullName } });
        }
      }

      // Direkte Navigation + onAuthStateChange in _layout als Backup
      router.replace('/(tabs)/' as any);

    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') return; // User hat abgebrochen
      console.error('Apple sign-in error:', e);
      Alert.alert(
        'Apple Anmeldung fehlgeschlagen',
        e?.message ?? 'Unbekannter Fehler. Bitte versuche es erneut.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoadingApple(false);
    }
  }

  const isLoading = loadingGoogle || loadingApple;

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>✦</Text>
        <Text style={styles.title}>K-Learning</Text>
        <Text style={styles.subtitle}>HSG · Lern wie auf Instagram</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.googleBtn, isLoading && styles.btnDisabled]}
          onPress={signInWithGoogle}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {loadingGoogle ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.btnText}>Mit Google anmelden</Text>
            </>
          )}
        </TouchableOpacity>

        {Platform.OS === 'ios' && (
          loadingApple ? (
            <View style={styles.appleLoading}>
              <ActivityIndicator color="#fff" />
              <Text style={styles.appleLoadingText}>Apple ID wird verifiziert…</Text>
            </View>
          ) : (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={14}
              style={[styles.appleBtn, isLoading && styles.btnDisabled]}
              onPress={signInWithApple}
            />
          )
        )}
      </View>

      <Text style={styles.hint}>Nur für HSG-Studenten</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 24,
  },
  hero: { alignItems: 'center', marginBottom: 16 },
  logo: { fontSize: 48, color: C.accent, marginBottom: 12 },
  title: { fontSize: 36, fontWeight: '800', color: C.text, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: C.textSub, marginTop: 4 },
  buttons: { width: '100%', gap: 12 },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.accent, borderRadius: R.lg,
    paddingVertical: 16, paddingHorizontal: 32,
    gap: 12, width: '100%', minHeight: 54,
  },
  googleIcon: { color: '#fff', fontWeight: '800', fontSize: 18 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnDisabled: { opacity: 0.5 },
  appleBtn: { width: '100%', height: 54 },
  appleLoading: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#000', borderRadius: R.lg, height: 54, gap: 10,
  },
  appleLoadingText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  hint: { color: C.textMuted, fontSize: F.sm },
});
