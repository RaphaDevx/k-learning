import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { supabase } from '../lib/supabase';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

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
  onRate: (slug: string, dbId: string, rating: 'knew' | 'didnt') => void;
}

export default function VideoCard({ card, isVisible, isMuted, onRate }: Props) {
  const src = card.hls_src || card.video_src || '';
  const color = card.course_color ?? '#7c3aed';

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

  return (
    <View style={styles.card}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Info overlay */}
      <View style={styles.overlay}>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: color + '44', borderColor: color + '99' }]}>
            <Text style={styles.badgeText}>{card.course}</Text>
          </View>
          <Text style={styles.duration}>{card.duration ?? ''}</Text>
        </View>

        <Text style={styles.title}>{card.title}</Text>
        {card.subtitle ? <Text style={[styles.subtitle, { color: color }]}>{card.subtitle}</Text> : null}

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.btn, styles.btnGreen]}
            onPress={() => onRate(card.slug, card.id, 'knew')}
          >
            <Text style={[styles.btnText, { color: '#34d399' }]}>✅ Kapiert</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnRed]}
            onPress={() => onRate(card.slug, card.id, 'didnt')}
          >
            <Text style={[styles.btnText, { color: '#f87171' }]}>🔁 Nochmal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 80,
    backgroundColor: 'transparent',
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  duration: {
    color: '#d1d5db',
    fontSize: 11,
    marginLeft: 'auto',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  btnGreen: {
    backgroundColor: 'rgba(52,211,153,0.2)',
    borderColor: 'rgba(52,211,153,0.5)',
  },
  btnRed: {
    backgroundColor: 'rgba(248,113,113,0.2)',
    borderColor: 'rgba(248,113,113,0.5)',
  },
  btnText: {
    fontWeight: '700',
    fontSize: 13,
  },
});
