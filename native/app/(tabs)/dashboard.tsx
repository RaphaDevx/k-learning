import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';

interface Stats {
  watched: number;
  due: number;
  streak: number;
}

export default function DashboardScreen() {
  const [stats, setStats] = useState<Stats>({ watched: 0, due: 0, streak: 0 });
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUserName(user.user_metadata?.full_name?.split(' ')[0] ?? 'Student');

    const { data: progress } = await supabase
      .from('video_progress')
      .select('status, next_review_at')
      .eq('user_id', user.id);

    if (progress) {
      const now = new Date();
      setStats({
        watched: progress.length,
        due: progress.filter(p => p.next_review_at && new Date(p.next_review_at) <= now).length,
        streak: 0, // TODO: implement streak tracking
      });
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hey, {userName} 👋</Text>
      <Text style={styles.sub}>Dein Lernfortschritt</Text>

      <View style={styles.statsRow}>
        <StatCard emoji="📹" value={stats.watched} label="Gesehen" color="#7c3aed" />
        <StatCard emoji="🔁" value={stats.due} label="Fällig" color="#ef4444" />
        <StatCard emoji="🔥" value={stats.streak} label="Streak" color="#f59e0b" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fällige Wiederholungen</Text>
        {stats.due === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>✅</Text>
            <Text style={styles.emptyText}>Alles up to date!</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.reviewBtn}>
            <Text style={styles.reviewBtnText}>⚡ {stats.due} Videos wiederholen</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kurse</Text>
        {['ESF', 'BWL', 'VWL', 'Recht'].map(course => (
          <View key={course} style={styles.courseRow}>
            <Text style={styles.courseEmoji}>📚</Text>
            <Text style={styles.courseName}>{course}</Text>
            <Text style={styles.courseArrow}>›</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function StatCard({ emoji, value, label, color }: { emoji: string; value: number; label: string; color: string }) {
  return (
    <View style={[styles.statCard, { borderColor: color + '44' }]}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  content: { padding: 20, gap: 20 },
  greeting: { color: '#fff', fontSize: 28, fontWeight: '800', marginTop: 40 },
  sub: { color: '#9ca3af', fontSize: 15 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1, backgroundColor: '#1f2937', borderRadius: 16, padding: 16,
    alignItems: 'center', borderWidth: 1,
  },
  statEmoji: { fontSize: 24, marginBottom: 4 },
  statValue: { fontSize: 28, fontWeight: '800' },
  statLabel: { color: '#9ca3af', fontSize: 12, marginTop: 2 },
  section: { gap: 12 },
  sectionTitle: { color: '#9ca3af', fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  emptyCard: {
    backgroundColor: '#1f2937', borderRadius: 16, padding: 24,
    alignItems: 'center', gap: 8,
  },
  emptyEmoji: { fontSize: 32 },
  emptyText: { color: '#9ca3af', fontSize: 15 },
  reviewBtn: {
    backgroundColor: '#7c3aed', borderRadius: 14, padding: 18, alignItems: 'center',
  },
  reviewBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  courseRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1f2937',
    borderRadius: 12, padding: 16, gap: 12,
  },
  courseEmoji: { fontSize: 20 },
  courseName: { color: '#fff', fontSize: 15, fontWeight: '600', flex: 1 },
  courseArrow: { color: '#6b7280', fontSize: 20 },
});
