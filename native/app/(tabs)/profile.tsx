import { useState, useCallback, useRef, useMemo } from 'react';
import type { ComponentProps } from 'react';
import {
  View, Text, Pressable, StyleSheet, Image,
  ScrollView, ActivityIndicator, Platform, Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useScrollContext } from './_layout';
import { useColors, T, S, R, GUTTER, HIT, MAX_SCALE_CHROME } from '../../constants/theme';
import SectionHeader from '../../components/SectionHeader';
import StatusBarScrim from '../../components/StatusBarScrim';
import type { ColorTokens } from '../../constants/theme';
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
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
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

  function confirmSignOut() {
    Alert.alert(
      'Abmelden?',
      'Du musst dich danach erneut anmelden.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Abmelden', style: 'destructive', onPress: signOut },
      ],
    );
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
      <View style={[styles.center, { backgroundColor: c.bg }]}>
        <ActivityIndicator color={c.textSub} size="large" />
      </View>
    );
  }

  const statRows: { icon: IconName; label: string; value: string }[] = [
    { icon: 'eye-outline', label: 'Videos gesehen', value: String(stats.watched) },
    { icon: 'albums-outline', label: 'Karten', value: String(stats.totalCards) },
    { icon: 'refresh-outline', label: 'Fällige Karten', value: String(stats.dueCards) },
    { icon: 'document-text-outline', label: 'Prüfungen abgeschlossen', value: String(stats.examsCompleted) },
    ...(stats.examsCompleted > 0 ? [
      { icon: 'trending-up-outline' as IconName, label: 'Durchschnittliche Punktzahl', value: `${stats.avgExamScore} %` },
      { icon: 'trophy-outline' as IconName, label: 'Beste Punktzahl', value: `${stats.bestExamScore} %` },
    ] : []),
  ];

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
    <StatusBarScrim />
    <ScrollView
      style={[styles.container, { backgroundColor: c.bg }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + S.lg, paddingBottom: S.xl }]}
      scrollEventThrottle={16}
      onScroll={({ nativeEvent }) => {
        const dy = nativeEvent.contentOffset.y - lastY.current;
        lastY.current = nativeEvent.contentOffset.y;
        onScroll(dy);
      }}
    >
      <Text style={styles.largeTitle} accessibilityRole="header">Profil</Text>

      {/* Account */}
      <View style={styles.group}>
        <View style={styles.accountRow}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} accessibilityIgnoresInvertColors />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
          )}
          <View style={styles.accountText}>
            <Text style={styles.name} numberOfLines={2}>{name}</Text>
            <Text style={styles.email} numberOfLines={1}>{email}</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <SectionHeader style={styles.sectionTitle}>Lernstatistik</SectionHeader>
      <View style={styles.group}>
        {statRows.map((r, i) => (
          <View key={r.label}>
            {i > 0 && <View style={styles.separator} />}
            <View style={styles.row} accessible accessibilityLabel={`${r.label}: ${r.value}`}>
              <Ionicons name={r.icon} size={22} color={c.textSub} />
              <Text style={styles.rowLabel}>{r.label}</Text>
              <Text style={styles.rowValue}>{r.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Actions */}
      <SectionHeader style={styles.sectionTitle}>Aktionen</SectionHeader>
      <View style={styles.group}>
        <NavRow
          styles={styles} c={c}
          icon="flash-outline"
          label="Fällige Karten lernen"
          onPress={() => router.push('/(tabs)/flashcards' as any)}
        />
        <View style={styles.separator} />
        <NavRow
          styles={styles} c={c}
          icon="document-text-outline"
          label="Prüfung starten"
          onPress={() => router.push('/(tabs)/exam' as any)}
        />
      </View>

      {/* Linked accounts */}
      <SectionHeader style={styles.sectionTitle}>Verknüpfte Accounts</SectionHeader>
      <View style={styles.group}>
        {linkedProviders.map((provider, i) => (
          <View key={provider}>
            {i > 0 && <View style={styles.separator} />}
            <View style={styles.row}>
              {provider === 'google'
                ? <Ionicons name="logo-google" size={22} color={c.textSub} />
                : provider === 'apple'
                  ? <Ionicons name="logo-apple" size={22} color={c.textSub} />
                  : <Ionicons name="person-circle-outline" size={22} color={c.textSub} />}
              <Text style={styles.rowLabel}>
                {provider === 'google' ? 'Google' : provider === 'apple' ? 'Apple ID' : provider}
              </Text>
              <View style={styles.linkedBadge}>
                <Ionicons name="checkmark-circle" size={18} color={c.green} />
                <Text style={styles.linkedBadgeText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>Verknüpft</Text>
              </View>
            </View>
          </View>
        ))}

        {!linkedProviders.includes('apple') && Platform.OS === 'ios' && (
          <>
            {linkedProviders.length > 0 && <View style={styles.separator} />}
            <Pressable
              style={({ pressed }) => [styles.row, pressed && styles.pressedRow]}
              onPress={linkAppleIdentity}
              disabled={loadingLink}
              accessibilityRole="button"
              accessibilityLabel="Apple ID verknüpfen"
            >
              {loadingLink
                ? <ActivityIndicator size="small" color={c.textSub} />
                : <Ionicons name="logo-apple" size={22} color={c.textSub} />}
              <Text style={[styles.rowLabel, { color: c.accent }]}>Apple ID verknüpfen</Text>
            </Pressable>
          </>
        )}
      </View>

      {/* Sign out — destructive row, confirmed via alert */}
      <View style={styles.group}>
        <Pressable
          style={({ pressed }) => [styles.row, pressed && styles.pressedRow]}
          onPress={confirmSignOut}
          accessibilityRole="button"
          accessibilityLabel="Abmelden"
        >
          <Ionicons name="log-out-outline" size={22} color={c.red} />
          <Text style={[styles.rowLabel, { color: c.red }]}>Abmelden</Text>
        </Pressable>
      </View>
    </ScrollView>
    </View>
  );
}

type IconName = ComponentProps<typeof Ionicons>['name'];
type Styles = ReturnType<typeof makeStyles>;

function NavRow({
  icon, label, onPress, styles, c,
}: {
  icon: IconName; label: string; onPress: () => void; styles: Styles; c: ColorTokens;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.pressedRow]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Ionicons name={icon} size={22} color={c.accent} />
      <Text style={styles.rowLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={c.textMuted} />
    </Pressable>
  );
}

const makeStyles = (c: ColorTokens) => StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: GUTTER, gap: S.sm },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  largeTitle: { ...T.largeTitle, color: c.text, marginBottom: S.sm },

  sectionTitle: { marginTop: S.lg },

  group: {
    backgroundColor: c.surface,
    borderRadius: R.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: HIT + 4,
    paddingVertical: S.sm + 2,
    paddingHorizontal: S.lg,
    gap: S.md,
  },
  pressedRow: { backgroundColor: c.surfaceHigh },
  rowLabel: { ...T.body, color: c.text, flex: 1 },
  rowValue: { ...T.body, color: c.textSub },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: c.separator,
    marginLeft: S.lg + 22 + S.md,
  },

  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.lg,
    padding: S.lg,
  },
  accountText: { flex: 1, gap: S.xxs },
  avatar: { width: 64, height: 64, borderRadius: R.full },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: R.full,
    backgroundColor: c.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: { ...T.title2, color: c.accent },
  name: { ...T.title3, color: c.text },
  email: { ...T.subhead, color: c.textSub },

  linkedBadge: { flexDirection: 'row', alignItems: 'center', gap: S.xs },
  linkedBadgeText: { ...T.footnote, color: c.green },
});
