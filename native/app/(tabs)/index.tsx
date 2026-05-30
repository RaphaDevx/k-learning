import { useState, useCallback, useRef } from 'react';
import {
  View, FlatList, Dimensions, TouchableOpacity, Text,
  StyleSheet, ActivityIndicator, ViewToken,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../../lib/supabase';
import VideoCard, { FeedCard } from '../../components/VideoCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function FeedScreen() {
  const [cards, setCards] = useState<FeedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadFeed();
    }, [])
  );

  async function loadFeed() {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.rpc('get_user_feed', {
          p_user_id: user.id,
          p_course: null,
          p_limit: 30,
        });
        if (!error && data) { setCards(data); return; }
      }
      // Fallback: load all videos
      const { data } = await supabase.from('videos').select('*').order('sort_order');
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
        <ActivityIndicator size="large" color="#7c3aed" />
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
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    color: '#9ca3af',
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
});
