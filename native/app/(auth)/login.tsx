import { useState, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, Platform, Alert, TextInput, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuthentication from 'expo-apple-authentication';
import { makeRedirectUri } from 'expo-auth-session';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useColors, useIsDark, T, S, R, GUTTER, HIT } from '../../constants/theme';
import type { ColorTokens } from '../../constants/theme';

WebBrowser.maybeCompleteAuthSession();

// Nur in Test-Builds (Maestro/E2E): E-Mail+Passwort-Login. Ohne Flag wird der Block nicht gerendert.
const E2E = process.env.EXPO_PUBLIC_E2E === '1';

export default function LoginScreen() {
  const c = useColors();
  const isDark = useIsDark();
  const styles = useMemo(() => makeStyles(c, isDark), [c, isDark]);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);
  const [e2eEmail, setE2eEmail] = useState('');
  const [e2ePassword, setE2ePassword] = useState('');
  const [e2eError, setE2eError] = useState('');
  const [loadingE2e, setLoadingE2e] = useState(false);

  async function signInWithPasswordE2E() {
    setLoadingE2e(true);
    setE2eError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: e2eEmail.trim(),
        password: e2ePassword,
      });
      if (error) throw error;
      // Navigation wie bei Apple: direkt + onAuthStateChange in _layout als Backup
      router.replace('/(tabs)/' as any);
    } catch (e: any) {
      setE2eError(e?.message ?? 'Unbekannter Fehler');
    } finally {
      setLoadingE2e(false);
    }
  }

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

  const isLoading = loadingGoogle || loadingApple || loadingE2e;

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Ionicons name="school" size={56} color={c.accent} style={styles.logo} accessibilityElementsHidden importantForAccessibility="no" />
        <Text style={styles.title} maxFontSizeMultiplier={1.4}>K-Learning</Text>
        <Text style={styles.subtitle}>HSG · Lern wie auf Instagram</Text>
      </View>

      <View style={styles.buttons}>
        {Platform.OS === 'ios' && (
          loadingApple ? (
            <View style={styles.appleLoading}>
              <ActivityIndicator color={isDark ? c.bg : 'white'} />
              <Text style={styles.appleLoadingText}>Apple ID wird verifiziert…</Text>
            </View>
          ) : (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={isDark
                ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={R.md}
              style={[styles.appleBtn, isLoading && styles.btnDisabled]}
              onPress={signInWithApple}
            />
          )
        )}

        <Pressable
          style={({ pressed }) => [styles.googleBtn, pressed && styles.pressed, isLoading && styles.btnDisabled]}
          onPress={signInWithGoogle}
          disabled={isLoading}
          accessibilityRole="button"
        >
          {loadingGoogle ? (
            <ActivityIndicator color={c.textSub} />
          ) : (
            <>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.googleText}>Mit Google anmelden</Text>
            </>
          )}
        </Pressable>

        {E2E && (
          <View style={styles.e2e}>
            <TextInput
              testID="e2e-email"
              style={styles.e2eInput}
              placeholder="E2E E-Mail"
              placeholderTextColor={c.textMuted}
              value={e2eEmail}
              onChangeText={setE2eEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <TextInput
              testID="e2e-password"
              style={styles.e2eInput}
              placeholder="E2E Passwort"
              placeholderTextColor={c.textMuted}
              value={e2ePassword}
              onChangeText={setE2ePassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable
              testID="e2e-login"
              style={({ pressed }) => [styles.e2eBtn, pressed && styles.pressed, isLoading && styles.btnDisabled]}
              onPress={signInWithPasswordE2E}
              disabled={isLoading}
            >
              {loadingE2e ? <ActivityIndicator color={c.onAccent} /> : <Text style={styles.e2eBtnText}>E2E Login</Text>}
            </Pressable>
            {!!e2eError && <Text testID="e2e-error" style={styles.e2eError}>{e2eError}</Text>}
          </View>
        )}
      </View>

      <Text style={styles.hint}>Nur für HSG-Studenten</Text>
    </View>
  );
}

const makeStyles = (c: ColorTokens, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: S.xl,
    gap: S.xl,
  },
  hero: { alignItems: 'center', marginBottom: S.lg },
  logo: { marginBottom: S.md },
  title: { ...T.largeTitle, color: c.text },
  subtitle: { ...T.body, color: c.textSub, marginTop: S.xs, textAlign: 'center' },
  buttons: { width: '100%', gap: S.md },
  appleBtn: { width: '100%', height: 54 },
  appleLoading: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: isDark ? c.text : 'black', borderRadius: R.md, height: 54, gap: S.sm,
  },
  appleLoadingText: { ...T.subhead, fontWeight: '600', color: isDark ? c.bg : 'white' },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: c.surface, borderRadius: R.md,
    borderWidth: StyleSheet.hairlineWidth, borderColor: c.separator,
    paddingHorizontal: S.xl, gap: S.md, width: '100%', minHeight: 54,
  },
  googleIcon: { ...T.headline, fontWeight: '800', color: c.text },
  googleText: { ...T.headline, color: c.text },
  btnDisabled: { opacity: 0.5 },
  pressed: { opacity: 0.6 },
  e2e: { gap: S.sm, marginTop: S.sm },
  e2eInput: {
    ...T.subhead,
    borderWidth: StyleSheet.hairlineWidth, borderColor: c.separator, borderRadius: R.md,
    minHeight: HIT, paddingHorizontal: S.md, color: c.text, backgroundColor: c.surface,
  },
  e2eBtn: {
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: c.accent, borderRadius: R.md, minHeight: 50,
  },
  e2eBtnText: { ...T.headline, color: c.onAccent },
  e2eError: { ...T.footnote, color: c.red },
  hint: { ...T.footnote, color: c.textSub, textAlign: 'center', paddingHorizontal: GUTTER },
});
