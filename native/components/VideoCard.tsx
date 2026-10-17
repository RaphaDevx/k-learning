import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useTabBarInset } from '../lib/tabBar';
import { DarkColors as d, T, S, R, GUTTER, HIT, MAX_SCALE_CHROME } from '../constants/theme';

export interface FeedCard {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  course: string;
  course_color?: string;
  duration?: string;
  video_src?: string;
  hls_src?: string;
}

interface Props {
  card: FeedCard;
  isVisible: boolean;
  isMuted: boolean;
  height: number;
  onRate: (slug: string, dbId: string, rating: 'knew' | 'didnt') => void;
}

export default function VideoCard({ card, isVisible, isMuted, height, onRate }: Props) {
  const src = card.hls_src || card.video_src || '';
  const color = card.course_color ?? d.accent;
  const tabInset = useTabBarInset();

  const player = useVideoPlayer(src, p => {
    p.loop = true;
    p.muted = isMuted;
  });

  // Play/pause based on visibility
  useEffect(() => {
    if (!player) return;
    if (isVisible) {
      player.play();
    } else {
      player.pause();
    }
  }, [isVisible, player]);

  // Sync mute state
  useEffect(() => {
    if (player) player.muted = isMuted;
  }, [isMuted, player]);

  // Content layer: video stays dark in both appearances, so it uses the dark tokens.
  return (
    <View style={[styles.card, { height }]}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        nativeControls={false}
      />

      {/* Scrim: stacked translucent bands approximate a bottom gradient */}
      <View style={styles.scrim} pointerEvents="none">
        {[360, 270, 180, 90].map(h => (
          <View key={h} style={[styles.scrimBand, { height: h }]} />
        ))}
      </View>

      {/* Info overlay */}
      <View style={[styles.overlay, { paddingBottom: tabInset }]}>
        <View style={styles.badges}>
          <View style={styles.badge}>
            <View style={[styles.badgeDot, { backgroundColor: color }]} />
            <Text style={styles.badgeText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{card.course}</Text>
          </View>
          {card.duration ? (
            <Text style={styles.duration} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{card.duration}</Text>
          ) : null}
        </View>

        <Text style={styles.title}>{card.title}</Text>
        {card.subtitle ? <Text style={styles.subtitle}>{card.subtitle}</Text> : null}

        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnGreen, pressed && styles.pressed]}
            onPress={() => onRate(card.slug, card.id, 'knew')}
            accessibilityRole="button"
          >
            <Text style={[styles.btnText, { color: d.green }]}>✅ Kapiert</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnRed, pressed && styles.pressed]}
            onPress={() => onRate(card.slug, card.id, 'didnt')}
            accessibilityRole="button"
          >
            <Text style={[styles.btnText, { color: d.red }]}>🔁 Nochmal</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'black',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrim: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  scrimBand: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'black', opacity: 0.16 },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: GUTTER,
    paddingTop: S.xxxl,
    backgroundColor: 'transparent',
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.sm,
    marginBottom: S.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.xs + 2,
    backgroundColor: d.overlay,
    borderRadius: R.full,
    paddingHorizontal: S.md,
    paddingVertical: S.xs,
  },
  badgeDot: { width: 8, height: 8, borderRadius: 4 },
  badgeText: { ...T.caption1, fontWeight: '600', color: d.text },
  duration: { ...T.caption1, color: d.textSub, marginLeft: 'auto' },
  title: {
    ...T.title3,
    color: d.text,
    marginBottom: S.xs,
    textShadowColor: d.overlay,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: { ...T.subhead, color: d.textSub, marginBottom: S.lg },
  buttons: {
    flexDirection: 'row',
    gap: S.sm,
    marginTop: S.xs,
  },
  btn: {
    flex: 1,
    minHeight: HIT + 6,
    paddingVertical: S.md,
    borderRadius: R.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGreen: { backgroundColor: d.overlay, borderWidth: 1, borderColor: d.green },
  btnRed: { backgroundColor: d.overlay, borderWidth: 1, borderColor: d.red },
  pressed: { opacity: 0.6 },
  btnText: { ...T.headline },
});
