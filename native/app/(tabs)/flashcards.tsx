import { View, Text, StyleSheet } from 'react-native';

export default function FlashcardsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🃏</Text>
      <Text style={styles.title}>Flashcards</Text>
      <Text style={styles.sub}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#111827',
    alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  emoji: { fontSize: 56 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  sub: { color: '#9ca3af', fontSize: 16 },
});
