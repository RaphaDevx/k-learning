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
  const [isMuted, setIsMuted] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);
  // Tab im Fokus? Nur dann darf ein Reel laufen (Tabs bleiben sonst gemountet und spielen weiter).
  const [focused, setFocused] = useState(false);
  // Während eines Halten-Gestes am Rand bleibt der Feed stehen.
  const [scrollLocked, setScrollLocked] = useState(false);
  const loadedCourse = useRef<string | null | undefined>(undefined);
  const listRef = useRef<Animated.FlatList<FeedCard>>(null);
  const { activeCourse } = useCourse();

  // Feed ist immer dunkel: Statusleiste hell, beim Verlassen zurück auf System.
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('light');
      setFocused(true);
      return () => {
        setStatusBarStyle('auto');
        setFocused(false);
        setScrollLocked(false);
      };
    }, [])
  );

  // Nur laden, wenn noch nichts da ist oder der Kurs gewechselt hat — sonst würde jeder
  // Tab-Wechsel die Liste neu aufbauen und alle Player neu starten.
  useFocusEffect(
    useCallback(() => {
      if (loadedCourse.current === activeCourse && cards.length > 0) return;
      loadFeed();
    }, [activeCourse, cards.length])
  );

  async function loadFeed() {
    if (cards.length === 0) setLoading(true);
    loadedCourse.current = activeCourse;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.rpc('get_user_feed', {
          p_user_id: user.id,
          p_course: activeCourse ?? null,
          p_limit: 30,
        });
        if (!error && data) { resetList(); setCards(data); return; }
      }
      // Fallback
      let query = supabase.from('videos').select('*').order('sort_order');
      if (activeCourse) query = query.eq('course', activeCourse);
      const { data } = await query;
      resetList();
      setCards(data ?? []);
    } catch (e) {
      console.warn('Feed load error:', e);
    } finally {
      setLoading(false);
    }
  }

  function resetList() {
    setVisibleIndex(0);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
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

  const toggleMute = useCallback(() => setIsMuted(m => !m), []);

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
        ref={listRef}
        scrollEnabled={!scrollLocked}
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <VideoCard
            card={item}
            isActive={focused && index === visibleIndex}
            shouldLoad={Math.abs(index - visibleIndex) <= 1}
            isMuted={isMuted}
            height={pageHeight}
            onToggleMute={toggleMute}
            onHoldChange={setScrollLocked}
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
  courseChip: {
    position: 'absolute', left: GUTTER, zIndex: 10,
    minHeight: HIT,
    flexDirection: 'row', alignItems: 'center', gap: S.xs + 1,
    backgroundColor: d.overlay,
    borderRadius: R.full, paddingHorizontal: S.md,
  },
  courseChipText: { ...T.footnote, fontWeight: '600', color: d.text },
});
