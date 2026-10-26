import { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, PanResponder } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BAR, barBottomGap } from '../lib/tabBar';
import RichText from './RichText';
import { DarkColors as d, T, S, R, GUTTER, MAX_SCALE_CHROME } from '../constants/theme';

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
  /** Dieses Reel läuft (sichtbar, Tab im Fokus). Immer nur eines. */
  isActive: boolean;
  /** Player wird nur für das aktive Reel und seine Nachbarn erzeugt (vorgeladen, stumm, pausiert). */
  shouldLoad: boolean;
  isMuted: boolean;
  height: number;
  onToggleMute: () => void;
  /** Meldet, ob gerade ein Halten am Rand läuft — der Feed sperrt dann das Scrollen. */
  onHoldChange: (holding: boolean) => void;
}

const FAST_RATE = 2;
// Rechter Rand: gedrückt halten = Schnellvorlauf, beim Halten nach unten schieben = fixieren.
const EDGE = { idle: 0.28, locked: 0.45 } as const; // bei aktivem 2x ist die Zone grösser
const HOLD_MS = { idle: 220, locked: 120 } as const; // …und das Erkennen schneller
const SLOP = { idle: 10, locked: 24 } as const; // Bewegung vor dem Halten, ab der es ein Scroll ist
const LOCK_DRAG = { idle: 56, locked: 28 } as const; // Schiebestrecke zum Fixieren / Lösen

// Der Player lebt nur, solange das Reel aktiv oder direkter Nachbar ist (Speicher, Ton).
function ReelPlayer({ src, active, muted, fast }: { src: string; active: boolean; muted: boolean; fast: boolean }) {
  const player = useVideoPlayer(src, p => {
    p.loop = true;
    p.muted = true;
  });

  useEffect(() => {
    if (active) {
      player.play();
    } else {
      player.pause();
      player.currentTime = 0;
    }
  }, [active, player]);

  // Nur das aktive Reel darf Ton haben.
  useEffect(() => {
    player.muted = muted || !active;
  }, [muted, active, player]);

  useEffect(() => {
    player.playbackRate = fast && active ? FAST_RATE : 1;
  }, [fast, active, player]);

  return <VideoView player={player} style={styles.video} contentFit="cover" nativeControls={false} />;
}

export default function VideoCard({ card, isActive, shouldLoad, isMuted, height, onToggleMute, onHoldChange }: Props) {
  const src = card.hls_src || card.video_src || '';
  const color = card.course_color ?? d.accent;
  const insets = useSafeAreaInsets();
  // Text sitzt knapp über der Kapsel, nicht darüber schwebend.
  const bottomInset = BAR.height + barBottomGap(insets.bottom) + S.md;
  const [fast, setFast] = useState(false);
  const [locked, setLocked] = useState(false);
  const flash = useRef(new Animated.Value(0)).current;
  const lockedRef = useRef(false);
  const holding = useRef(false);
  const moved = useRef(false);
  const slid = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Die PanResponder-Callbacks werden nur einmal erzeugt; aktuelle Werte kommen über Refs.
  const cb = useRef({ onToggleMute, onHoldChange });
  cb.current = { onToggleMute, onHoldChange };

  // Kurzes Lautsprecher-Symbol in der Mitte nach jedem Tippen (nicht beim ersten Anzeigen).
  const firstMute = useRef(true);
  useEffect(() => {
    if (firstMute.current) { firstMute.current = false; return; }
    if (!isActive) return;
    flash.setValue(1);
    Animated.timing(flash, { toValue: 0, duration: 700, delay: 250, useNativeDriver: true }).start();
  }, [isMuted]); // eslint-disable-line react-hooks/exhaustive-deps

  const setLock = (on: boolean) => {
    lockedRef.current = on;
    setLocked(on);
  };

  const endTouch = (isTap: boolean) => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = null;
    if (holding.current) {
      setFast(lockedRef.current);
      cb.current.onHoldChange(false);
    } else if (isTap) {
      // Bei aktivem 2x reicht ein Tippen am Rand zum Lösen; sonst Ton an/aus.
      if (lockedRef.current) { setLock(false); setFast(false); }
      else cb.current.onToggleMute();
    }
    holding.current = false;
    moved.current = false;
    slid.current = false;
  };

  const edgeResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // Nach erkanntem Halten gehört die Geste uns, davor darf der Feed scrollen.
      onPanResponderTerminationRequest: () => !holding.current,
      onPanResponderGrant: () => {
        const m = lockedRef.current ? 'locked' : 'idle';
        holdTimer.current = setTimeout(() => {
          holding.current = true;
          setFast(true);
          cb.current.onHoldChange(true); // Scrollen sperren, bevor der Finger wandert
        }, HOLD_MS[m]);
      },
      onPanResponderMove: (_, g) => {
        const m = lockedRef.current ? 'locked' : 'idle';
        if (!holding.current) {
          // Zu früh bewegt = Scroll-Absicht: Halten abbrechen, Feed übernimmt.
          if (Math.abs(g.dy) > SLOP[m] || Math.abs(g.dx) > SLOP[m]) {
            moved.current = true;
            if (holdTimer.current) clearTimeout(holdTimer.current);
            holdTimer.current = null;
          }
          return;
        }
        if (!slid.current && g.dy >= LOCK_DRAG[m]) {
          slid.current = true;
          setLock(!lockedRef.current);
        }
      },
      onPanResponderRelease: () => endTouch(!moved.current),
      onPanResponderTerminate: () => endTouch(false),
    }),
  ).current;

  // Beim Wegscrollen / Tab-Wechsel zurück auf Normaltempo, nichts bleibt fixiert.
  useEffect(() => {
    if (!isActive) {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      holdTimer.current = null;
      if (holding.current) cb.current.onHoldChange(false);
      holding.current = false;
      setLock(false);
      setFast(false);
    }
  }, [isActive]);

  const zone = locked ? EDGE.locked : EDGE.idle;
  const zonePct = `${zone * 100}%` as `${number}%`;

  // Content layer: video stays dark in both appearances, so it uses the dark tokens.
  return (
    <View style={[styles.card, { height }]}>
      {shouldLoad && src ? <ReelPlayer src={src} active={isActive} muted={isMuted} fast={fast} /> : null}

      {/* Tippen = Ton an/aus; rechter Rand halten = 2x, dabei nach unten schieben = fixieren */}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <Pressable
          style={[styles.zone, { left: 0, right: zonePct }]}
          onPress={onToggleMute}
          accessibilityRole="button"
          accessibilityLabel={isMuted ? 'Ton einschalten' : 'Ton ausschalten'}
        />
        <View
          style={[styles.zone, { right: 0, width: zonePct }]}
          accessibilityLabel="Gedrückt halten für doppelte Geschwindigkeit"
          {...edgeResponder.panHandlers}
        />
      </View>

      {/* Dunkler Verlauf oben, damit Statusleiste und Filter lesbar bleiben */}
      <View style={styles.topScrim} pointerEvents="none">
        {[150, 100, 56].map(h => (
          <View key={h} style={[styles.scrimBand, { top: 0, bottom: undefined, height: h, opacity: 0.18 }]} />
        ))}
      </View>

      <Animated.View style={[styles.flash, { opacity: flash }]} pointerEvents="none">
        <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={34} color={d.text} />
      </Animated.View>
      {(fast || locked) && (
        <View style={[styles.fastBadge, { top: insets.top + S.xxxl + S.md }]} pointerEvents="none">
          <Ionicons name="play-forward" size={16} color={d.text} />
          <Text style={styles.fastText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>
            {locked ? '2x fixiert' : '2x'}
          </Text>
          {!locked && (
            <Ionicons name="arrow-down" size={14} color={d.textSub} />
          )}
        </View>
      )}

      {/* Scrim: stacked translucent bands approximate a bottom gradient */}
      <View style={styles.scrim} pointerEvents="none">
        {[360, 270, 180, 90].map(h => (
          <View key={h} style={[styles.scrimBand, { height: h }]} />
        ))}
      </View>

      {/* Info overlay */}
      <View style={[styles.overlay, { paddingBottom: bottomInset }]} pointerEvents="none">
        <View style={styles.badges}>
          <View style={styles.badge}>
            <View style={[styles.badgeDot, { backgroundColor: color }]} />
            <Text style={styles.badgeText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{card.course}</Text>
          </View>
          {card.duration ? (
            <Text style={styles.duration} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{card.duration}</Text>
          ) : null}
        </View>

        <RichText
          text={card.title}
          variant="title"
          color={d.text}
          style={styles.titleShadow}
        />
        {card.subtitle ? (
          <View style={styles.subtitle}>
            <RichText text={card.subtitle} variant="body" color={d.textSub} numberOfLines={4} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'black',
  },
  video: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
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
  titleShadow: {
    textShadowColor: d.overlay,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: { marginTop: S.xs },
  zone: { position: 'absolute', top: 0, bottom: 0 },
  topScrim: { position: 'absolute', left: 0, right: 0, top: 0, height: 150 },
  flash: {
    position: 'absolute', alignSelf: 'center', top: '45%',
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: d.overlay, alignItems: 'center', justifyContent: 'center',
  },
  fastBadge: {
    position: 'absolute', alignSelf: 'center',
    flexDirection: 'row', alignItems: 'center', gap: S.xs,
    backgroundColor: d.overlay, borderRadius: R.full,
    paddingHorizontal: S.md, paddingVertical: S.xs,
  },
  fastText: { ...T.footnote, fontWeight: '700', color: d.text },
});
