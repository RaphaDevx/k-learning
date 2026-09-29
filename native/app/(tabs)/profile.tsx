import { useState, useCallback, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image,
  ScrollView, ActivityIndicator, Platform, Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useScrollContext } from './_layout';
import { C, R, F } from '../../constants/theme';
import type { User } from '@supabase/supabase-js';

WebBrowser.maybeCompleteAuthSession();

interface ProfileStats {
  watched: number;
  totalCards: number;
  dueCards: number;
  examsCompleted: number;
  avgExamScore: number;
  bestExamScore: number;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { onScroll } = useScrollContext();
  const lastY = useRef(0);

  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<ProfileStats>({
    watched: 0, totalCards: 0, dueCards: 0,
    examsCompleted: 0, avgExamScore: 0, bestExamScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [loadingLink, setLoadingLink] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  async function loadProfile() {
    setLoading(true);
    try {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      if (!u) return;

      const now = new Date();

      const [progressRes, cardsRes, examsRes] = await Promise.all([
        supabase.from('video_progress').select('id').eq('user_id', u.id),
        supabase.from('deck_cards').select('id, next_review_at').is('deleted_at', null),
        supabase.from('exam_results').select('score_pct').eq('user_id', u.id),
      ]);

      const cards = cardsRes.data ?? [];
      const exams = examsRes.data ?? [];

      const avgScore = exams.length > 0
        ? Math.round(exams.reduce((s, e) => s + e.score_pct, 0) / exams.length)
        : 0;
      const bestScore = exams.length > 0
        ? Math.max(...exams.map(e => e.score_pct))
        : 0;

      setStats({
        watched: progressRes.data?.length ?? 0,
        totalCards: cards.length,
        dueCards: cards.filter(c => !c.next_review_at || new Date(c.next_review_at) <= now).length,
        examsCompleted: exams.length,
        avgExamScore: avgScore,
        bestExamScore: bestScore,
      });
    } catch (e) {
      console.warn('loadProfile error:', e);
    } finally {
      setLoading(false);
    }
  }

  async function linkAppleIdentity() {
    setLoadingLink(true);
    try {
      const redirectTo = makeRedirectUri({ scheme: 'k-learning', path: 'auth/callback' });
      const { data, error } = await (supabase.auth as any).linkIdentity({
        provider: 'apple',
        options: { redirectTo, skipBrowserRedirect: true },
      });
      if (error) throw error;
      if (!data?.url) throw new Error('Keine Link-URL von Supabase erhalten');

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
      if (result.type === 'success' && result.url) {
        const params = result.url.includes('?')
          ? result.url.split('?')[1]
          : result.url.split('#')[1] ?? '';
        await supabase.auth.exchangeCodeForSession(params);
      }

      await loadProfile();
      Alert.alert('Verknüpft ✓', 'Apple ID wurde erfolgreich mit deinem Account verknüpft.');
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') return;
      Alert.alert('Fehler', e?.message ?? 'Apple ID konnte nicht verknüpft werden.');
    } finally {
      setLoadingLink(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/(auth)/login');
  }

  const name = user?.user_metadata?.full_name ?? 'Student';
  const email = user?.email ?? '';
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const initials = name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();
  const linkedProviders = (user?.identities ?? []).map(i => i.provider);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: C.bg }]}>
        <ActivityIndicator color={C.accentLight} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: C.bg }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 100 }]}
      scrollEventThrottle={16}
      onScroll={({ nativeEvent }) => {
        const dy = nativeEvent.contentOffset.y - lastY.current;
        lastY.current = nativeEvent.contentOffset.y;
        onScroll(dy);
      }}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.avatarRing}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <View style={styles.badge}>
          <Ionicons name="school-outline" size={12} color={C.accentLight} />
          <Text style={styles.badgeText}>HSG Student</Text>
        </View>
      </View>

      {/* Stats horizontal scroll */}
      <Text style={styles.sectionTitle}>Lernstatistik</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsScroll}
      >
        <StatPill icon="eye-outline" value={stats.watched} label="Videos" accent={C.accent} />
        <StatPill icon="albums-outline" value={stats.totalCards} label="Karten" accent={C.blue} />
        <StatPill icon="refresh-outline" value={stats.dueCards} label="Fällig" accent={C.red} />
        <StatPill icon="document-text-outline" value={stats.examsCompleted} label="Prüfungen" accent={C.green} />
        {stats.examsCompleted > 0 && (
          <StatPill icon="trending-up-outline" value={stats.avgExamScore} label="Ø Score %" accent={C.yellow} />
        )}
        {stats.examsCompleted > 0 && (
          <StatPill icon="trophy-outline" value={stats.bestExamScore} label="Best %" accent={C.accentLight} />
        )}
      </ScrollView>

      {/* Settings-style action rows */}
      <Text style={styles.sectionTitle}>Aktionen</Text>
      <View style={styles.settingsList}>
        <SettingsRow
          icon="flash-outline"
          label="Fällige Karten lernen"
          accent={C.accent}
          onPress={() => router.push('/(tabs)/flashcards' as any)}
        />
        <View style={styles.settingsDivider} />
        <SettingsRow
          icon="document-text-outline"
          label="Prüfung starten"
          accent={C.green}
          onPress={() => router.push('/(tabs)/exam' as any)}
        />
      </View>

      {/* Linked accounts */}
      <Text style={styles.sectionTitle}>Verknüpfte Accounts</Text>
      <View style={styles.settingsList}>
        {linkedProviders.map((provider, i) => (
          <View key={provider}>
            {i > 0 && <View style={styles.settingsDivider} />}
            <View style={styles.settingsRow}>
              <View style={[styles.settingsIconBox, { backgroundColor: provider === 'google' ? '#EA433520' : '#00000020' }]}>
                <Text style={styles.providerIcon}>{provider === 'google' ? 'G' : ''}</Text>
                {provider === 'apple' && <Ionicons name="logo-apple" size={18} color={C.text} />}
              </View>
              <Text style={styles.settingsLabel}>
                {provider === 'google' ? 'Google' : provider === 'apple' ? 'Apple ID' : provider}
              </Text>
              <View style={styles.linkedBadge}>
                <Ionicons name="checkmark-circle" size={16} color={C.green} />
                <Text style={styles.linkedBadgeText}>Verknüpft</Text>
              </View>
            </View>
          </View>
        ))}

        {!linkedProviders.includes('apple') && Platform.OS === 'ios' && (
          <>
            {linkedProviders.length > 0 && <View style={styles.settingsDivider} />}
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={linkAppleIdentity}
              disabled={loadingLink}
              activeOpacity={0.7}
            >
              <View style={[styles.settingsIconBox, { backgroundColor: '#00000014' }]}>
                {loadingLink
                  ? <ActivityIndicator size="small" color={C.text} />
                  : <Ionicons name="logo-apple" size={18} color={C.text} />
                }
              </View>
              <Text style={styles.settingsLabel}>Apple ID verknüpfen</Text>
              <Ionicons name="add-circle-outline" size={16} color={C.accentLight} />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Sign out — red row */}
      <View style={styles.settingsList}>
        <TouchableOpacity style={styles.signOutRow} onPress={signOut} activeOpacity={0.7}>
          <View style={[styles.settingsIconBox, { backgroundColor: C.red + '18' }]}>
            <Ionicons name="log-out-outline" size={18} color={C.red} />
          </View>
          <Text style={styles.signOutLabel}>Abmelden</Text>
          <Ionicons name="chevron-forward" size={16} color={C.textMuted} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function StatPill({
  icon, value, label, accent,
}: {
  icon: string; value: number; label: string; accent: string;
}) {
  return (
    <View style={[styles.statPill, { borderColor: accent + '40' }]}>
      <View style={[styles.statPillIcon, { backgroundColor: accent + '18' }]}>
        <Ionicons name={icon as any} size={16} color={accent} />
      </View>
      <Text style={[styles.statPillValue, { color: accent }]}>{value}</Text>
      <Text style={styles.statPillLabel}>{label}</Text>
    </View>
  );
}

function SettingsRow({
  icon, label, accent, onPress,
}: {
  icon: string; label: string; accent: string; onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.settingsRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.settingsIconBox, { backgroundColor: accent + '18' }]}>
        <Ionicons name={icon as any} size={18} color={accent} />
      </View>
      <Text style={styles.settingsLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={C.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Hero
  hero: { alignItems: 'center', gap: 6, paddingVertical: 12 },
  avatarRing: {
    padding: 3,
    borderRadius: R.full,
    borderWidth: 3,
    borderColor: C.accentLight,
    marginBottom: 8,
  },
  avatar: { width: 84, height: 84, borderRadius: 42 },
  avatarPlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: C.accent + '44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: { color: C.accentLight, fontSize: F.xl, fontWeight: '800' },
  name: { color: C.text, fontSize: F.xl, fontWeight: '800' },
  email: { color: C.textSub, fontSize: F.sm },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: C.accent + '22',
    borderRadius: R.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 4,
    borderWidth: 1,
    borderColor: C.accent + '44',
  },
  badgeText: { color: C.accentLight, fontSize: F.xs, fontWeight: '700' },

  // Section titles
  sectionTitle: {
    color: C.textSub,
    fontSize: F.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Stats horizontal scroll
  statsScroll: { gap: 10, paddingRight: 4 },
  statPill: {
    backgroundColor: C.surface,
    borderRadius: R.lg,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    minWidth: 88,
  },
  statPillIcon: {
    width: 34,
    height: 34,
    borderRadius: R.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statPillValue: { fontSize: F.lg, fontWeight: '800' },
  statPillLabel: { color: C.textSub, fontSize: F.xs, fontWeight: '600' },

  // Settings list
  settingsList: {
    backgroundColor: C.surface,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingsIconBox: {
    width: 36,
    height: 36,
    borderRadius: R.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsLabel: { color: C.text, fontSize: F.base, fontWeight: '600', flex: 1 },
  settingsDivider: { height: 1, backgroundColor: C.border, marginLeft: 64 },

  // Provider icons
  providerIcon: { color: '#EA4335', fontWeight: '800', fontSize: 16 },
  linkedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  linkedBadgeText: { color: C.green, fontSize: F.xs, fontWeight: '700' },

  // Sign out
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  signOutLabel: { color: C.red, fontSize: F.base, fontWeight: '600', flex: 1 },
});
