import { createContext, useContext, type ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
  ReduceMotion,
  type SharedValue,
} from 'react-native-reanimated';

// Floating capsule tab bar, measured from Instagram Reels (393 pt wide iPhone):
//   expanded  348 × 59 pt, 22 pt side margin, selected pill 76 × 50, icons 23 pt
//   collapsed 293 × 51 pt  → a uniform scale of ~0.85, anchored at the bottom centre
// We add small labels (HIG: tab labels), so the expanded capsule is a little taller.
export const BAR = {
  height: 64,
  sideMargin: 22,
  pillWidth: 76,
  pillHeight: 54,
  icon: 23,
  compactScale: 0.85,
  // Scroll distance (pt) over which the bar goes from expanded to collapsed.
  collapseDistance: 64,
} as const;

export const SPRING = { damping: 22, stiffness: 260, mass: 0.6, reduceMotion: ReduceMotion.System } as const;

// Distance from the screen bottom to the capsule: sits inside the home-indicator zone like iOS 26.
export function barBottomGap(safeBottom: number): number {
  return Math.max(12, safeBottom - 11);
}

/** Space a scrolling screen must leave at its bottom so content can scroll clear of the capsule. */
export function useTabBarInset(): number {
  const { bottom } = useSafeAreaInsets();
  return BAR.height + barBottomGap(bottom) + 16;
}

// 0 = expanded, 1 = collapsed. Lives on the UI thread; scroll handlers write it, the bar reads it.
const ProgressContext = createContext<SharedValue<number> | null>(null);

export function TabBarProgressProvider({ children }: { children: ReactNode }) {
  const progress = useSharedValue(0);
  return <ProgressContext.Provider value={progress}>{children}</ProgressContext.Provider>;
}

export function useTabBarProgress(): SharedValue<number> {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useTabBarProgress outside TabBarProgressProvider');
  return ctx;
}

/**
 * Scroll handler that drives the capsule interactively: it follows the finger 1:1
 * (scrolling down collapses, scrolling up expands) and settles with a spring when the
 * gesture and momentum end. Pass it to an Animated.ScrollView / Animated.FlatList
 * `onScroll` with `scrollEventThrottle={16}`. Runs entirely on the UI thread.
 */
export function useCollapsingTabBar() {
  const progress = useTabBarProgress();
  const lastY = useSharedValue(0);

  return useAnimatedScrollHandler({
    onBeginDrag: e => {
      lastY.value = e.contentOffset.y;
    },
    onScroll: e => {
      const y = e.contentOffset.y;
      const maxY = Math.max(0, e.contentSize.height - e.layoutMeasurement.height);
      const dy = y - lastY.value;
      lastY.value = y;

      // Pulled past the top: always show the full bar.
      if (y <= 0) {
        progress.value = 0;
        return;
      }
      // Rubber-banding past the end would flip the bar back open; ignore it.
      if (y >= maxY && dy < 0) return;

      const next = progress.value + dy / BAR.collapseDistance;
      progress.value = next < 0 ? 0 : next > 1 ? 1 : next;
    },
    onEndDrag: e => {
      // Momentum may continue; settle now, onScroll takes over again if it does.
      const v = e.velocity?.y ?? 0;
      const target = v > 0.3 ? 1 : v < -0.3 ? 0 : progress.value > 0.5 ? 1 : 0;
      progress.value = withSpring(e.contentOffset.y <= 0 ? 0 : target, SPRING);
    },
    onMomentumEnd: e => {
      const target = e.contentOffset.y <= 0 ? 0 : progress.value > 0.5 ? 1 : 0;
      progress.value = withSpring(target, SPRING);
    },
  });
}
