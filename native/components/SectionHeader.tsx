import { View, Text, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useColors, T, S } from '../constants/theme';

interface Props {
  children: ReactNode;
  /** Optionaler Farb-Punkt (z. B. Kursfarbe) vor dem Titel. */
  dotColor?: string;
  /** Element rechts (z. B. Badge). */
  right?: ReactNode;
  /** Horizontaler Einzug ab Kartenkante; 0 wenn der Container schon eingerückt ist. */
  inset?: number;
  style?: StyleProp<ViewStyle>;
}

// Einheitlicher Gruppenkopf (iOS-Stil): footnote, textSub, Grossbuchstaben.
export default function SectionHeader({ children, dotColor, right, inset = S.lg, style }: Props) {
  const c = useColors();
  return (
    <View style={[styles.row, { paddingHorizontal: inset }, style]}>
      {dotColor ? <View style={[styles.dot, { backgroundColor: dotColor }]} /> : null}
      <Text
        style={[T.footnote, styles.title, { color: c.textSub }]}
        accessibilityRole="header"
      >
        {children}
      </Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: S.sm },
  title: { textTransform: 'uppercase', flexShrink: 1 },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
