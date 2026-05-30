import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/(auth)/login');
  }

  const avatarUrl = user?.user_metadata?.avatar_url;
  const name = user?.user_metadata?.full_name ?? 'Student';
  const email = user?.email ?? '';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
        )}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
        <Text style={styles.signOutText}>Abmelden</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#111827',
    alignItems: 'center', justifyContent: 'center',
    padding: 24, gap: 24,
  },
  card: {
    backgroundColor: '#1f2937', borderRadius: 20,
    padding: 32, alignItems: 'center', gap: 8, width: '100%',
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40, marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#374151', alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  avatarEmoji: { fontSize: 36 },
  name: { color: '#fff', fontSize: 22, fontWeight: '800' },
  email: { color: '#9ca3af', fontSize: 14 },
  signOutBtn: {
    backgroundColor: '#374151', borderRadius: 14,
    paddingVertical: 16, paddingHorizontal: 40, width: '100%', alignItems: 'center',
  },
  signOutText: { color: '#f87171', fontWeight: '700', fontSize: 16 },
});
