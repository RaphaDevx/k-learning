import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuthentication from 'expo-apple-authentication';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '../../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple]   = useState(false);

  async function signInWithGoogle() {
    setLoadingGoogle(true);
    try {
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

      if (!credential.identityToken) throw new Error('No identity token');

      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

      if (error) throw error;
    } catch (e: any) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        console.warn('Apple sign-in error:', e);
      }
    } finally {
      setLoadingApple(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>⚡</Text>
        <Text style={styles.title}>K-Learning</Text>
        <Text style={styles.subtitle}>HSG · Lern wie auf Instagram</Text>
      </View>

      <View style={styles.buttons}>
        {/* Google */}
        <TouchableOpacity style={styles.googleBtn} onPress={signInWithGoogle} disabled={loadingGoogle || loadingApple}>
          {loadingGoogle ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.btnText}>Mit Google anmelden</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Apple — nur auf iOS anzeigen */}
        {Platform.OS === 'ios' && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={14}
            style={styles.appleBtn}
            onPress={signInWithApple}
          />
        )}
      </View>

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
  buttons: {
    width: '100%',
    gap: 12,
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
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  appleBtn: {
    width: '100%',
    height: 54,
  },
  hint: {
    color: '#6b7280',
    fontSize: 13,
  },
});
