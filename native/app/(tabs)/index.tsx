import { useState, useCallback, useRef } from 'react';
import { setStatusBarStyle } from 'expo-status-bar';
import {
  View, Pressable, Text,
  StyleSheet, ActivityIndicator, ViewToken, LayoutChangeEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useCollapsingTabBar } from '../../lib/tabBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useCourse } from '../../lib/courseContext';
import VideoCard, { FeedCard } from '../../components/VideoCard';
import { useColors, DarkColors as d, T, S, R, GUTTER, HIT, MAX_SCALE_CHROME } from '../../constants/theme';

export default function FeedScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const onScroll = useCollapsingTabBar();
  const [cards, setCards] = useState<FeedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [pageHeight, setPageHeight] = useState(0);
  const { activeCourse } = useCourse();

  // Feed ist immer dunkel: Statusleiste hell, beim Verlassen zurück auf System.
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('light');
      return () => setStatusBarStyle('auto');
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      loadFeed();
    }, [activeCourse])
  );

  async function loadFeed() {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.rpc('get_user_feed', {
          p_user_id: user.id,
          p_course: activeCourse ?? null,
          p_limit: 30,
        });
        if (!error && data) { setCards(data); return; }
      }
      // Fallback
      let query = supabase.from('videos').select('*').order('sort_order');
      if (activeCourse) query = query.eq('course', activeCourse);
      const { data } = await query;
      setCards(data ?? []);
    } catch (e) {
      console.warn('Feed load error:', e);
    } finally {
      setLoading(false);
    }
  }

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setVisibleIndex(viewableItems[0].index ?? 0);
      }
    },
    []
  );

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;

  async function handleRate(slug: string, dbId: string, rating: 'knew' | 'didnt') {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && dbId) {
        await supabase.rpc('rate_video', {
          p_user_id: user.id,
          p_video_id: dbId,
          p_rating: rating,
        });
      }
    } catch (e) {
      console.warn('rate_video error:', e);
    }
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: c.bg }]}>
        <ActivityIndicator size="large" color={c.textSub} />
      </View>
    );
  }

  if (!cards.length) {
    return (
      <View style={[styles.center, { backgroundColor: c.bg }]}>
        <Ionicons name="videocam-outline" size={48} color={c.textSub} />
        <Text style={[T.title3, { color: c.text }]}>Keine Videos verfügbar</Text>
        <Text style={[T.subhead, { color: c.textSub, textAlign: 'center' }]}>
          Für diese Auswahl gibt es noch keine Lernvideos.
        </Text>
        <Pressable
          style={({ pressed }) => [styles.retryBtn, { backgroundColor: c.accentSoft }, pressed && styles.pressed]}
          onPress={loadFeed}
          accessibilityRole="button"
          accessibilityLabel="Feed neu laden"
        >
          <Text style={[T.headline, { color: c.accent }]}>Neu laden</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      onLayout={(e: LayoutChangeEvent) => {
        const h = Math.round(e.nativeEvent.layout.height);
        if (h > 0 && h !== pageHeight) setPageHeight(h);
      }}
    >
      {activeCourse && (
        <View style={[styles.courseChip, { top: insets.top + S.sm }]} pointerEvents="none">
          <Ionicons name="filter" size={14} color={d.text} />
          <Text style={styles.courseChipText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{activeCourse}</Text>
        </View>
      )}
      {pageHeight > 0 && (
      <Animated.FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <VideoCard
            card={item}
            isVisible={index === visibleIndex}
            isMuted={isMuted}
            height={pageHeight}
            onRate={handleRate}
          />
        )}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: pageHeight,
          offset: pageHeight * index,
          index,
        })}
        snapToInterval={pageHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        removeClippedSubviews
        maxToRenderPerBatch={3}
        windowSize={3}
      />
      )}

      {/* Mute toggle */}
      <Pressable
        style={({ pressed }) => [styles.muteBtn, { top: insets.top + S.sm }, pressed && styles.pressed]}
        onPress={() => setIsMuted(m => !m)}
        accessibilityRole="button"
        accessibilityLabel={isMuted ? 'Ton einschalten' : 'Ton ausschalten'}
      >
        <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={22} color={d.text} />
        <Text style={styles.muteLabel} maxFontSizeMultiplier={MAX_SCALE_CHROME}>{isMuted ? 'Ton aus' : 'Ton an'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // content layer: video stays black in both appearances
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: S.md,
    paddingHorizontal: S.xl,
  },
  retryBtn: {
    minHeight: HIT, paddingHorizontal: S.xl, borderRadius: R.md,
    alignItems: 'center', justifyContent: 'center', marginTop: S.sm,
  },
  pressed: { opacity: 0.6 },
  muteBtn: {
    position: 'absolute',
    right: GUTTER,
    minHeight: HIT,
    minWidth: HIT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: S.xs + 2,
    paddingHorizontal: S.md,
    borderRadius: R.full,
    backgroundColor: d.overlay,
    justifyContent: 'center',
  },
  muteLabel: { ...T.footnote, fontWeight: '600', color: d.text },
  courseChip: {
    position: 'absolute', left: GUTTER, zIndex: 10,
    minHeight: HIT,
    flexDirection: 'row', alignItems: 'center', gap: S.xs + 1,
    backgroundColor: d.overlay,
    borderRadius: R.full, paddingHorizontal: S.md,
  },
  courseChipText: { ...T.footnote, fontWeight: '600', color: d.text },
});
