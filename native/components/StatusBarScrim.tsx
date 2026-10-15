import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../constants/theme';

// Deckt den Statusleisten-Bereich ab, damit gescrollter Inhalt nicht unter der Uhr läuft.
export default function StatusBarScrim() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  return (
    <View
      pointerEvents="none"
      style={[styles.scrim, { height: insets.top, backgroundColor: c.bg }]}
    />
  );
}

const styles = StyleSheet.create({
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
});
