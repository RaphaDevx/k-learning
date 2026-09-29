import { useState, useCallback, useRef } from 'react';
import {
  View, FlatList, Dimensions, TouchableOpacity, Text,
  StyleSheet, ActivityIndicator, ViewToken,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useCourse } from '../../lib/courseContext';
import VideoCard, { FeedCard } from '../../components/VideoCard';
import { C } from '../../constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function FeedScreen() {
  const [cards, setCards] = useState<FeedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const { activeCourse } = useCourse();

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
      <View style={styles.center}>
        <ActivityIndicator size="large" color={C.accent} />
      </View>
    );
  }

  if (!cards.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyEmoji}>⚡</Text>
        <Text style={styles.emptyText}>Keine Videos verfügbar</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {activeCourse && (
        <View style={styles.courseChip} pointerEvents="none">
          <Ionicons name="filter" size={12} color="#fff" />
          <Text style={styles.courseChipText}>{activeCourse}</Text>
        </View>
      )}
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <VideoCard
            card={item}
            isVisible={index === visibleIndex}
            isMuted={isMuted}
            onRate={handleRate}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        removeClippedSubviews
        maxToRenderPerBatch={3}
        windowSize={3}
      />

      {/* Mute toggle */}
      <TouchableOpacity style={styles.muteBtn} onPress={() => setIsMuted(m => !m)}>
        <Text style={styles.muteIcon}>{isMuted ? '🔇' : '🔊'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // video player stays black
  },
  center: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    color: C.textSub,
    fontSize: 16,
  },
  muteBtn: {
    position: 'absolute',
    top: 56,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  muteIcon: {
    fontSize: 20,
  },
  courseChip: {
    position: 'absolute', top: 56, left: 16, zIndex: 10,
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
  },
  courseChipText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
