import { memo, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, useWindowDimensions, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { Tabs } from 'expo-router';
import { BAR, SPRING, barBottomGap, useTabBarProgress } from '../lib/tabBar';
import { LightColors, T, MAX_SCALE_CHROME } from '../constants/theme';

type TabBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>>[0];
type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface CapsuleItem {
  name: string;
  title: string;
  icon: IconName;
  iconOutline: IconName;
}

// Glass treatments. Dark mirrors the Instagram reference; light keeps the eggshell identity.
const GLASS = {
  dark: {
    tint: 'systemChromeMaterialDark' as const,
    fill: 'rgba(24,25,29,0.55)',
    fallback: 'rgba(24,25,29,0.94)',
    stroke: 'rgba(255,255,255,0.14)',
    pill: 'rgba(255,255,255,0.18)',
    active: '#FFFFFF',
    inactive: 'rgba(255,255,255,0.82)',
  },
  light: {
    tint: 'systemChromeMaterialLight' as const,
    fill: 'rgba(251,249,245,0.55)',
    fallback: 'rgba(251,249,245,0.96)',
    stroke: 'rgba(22,22,24,0.10)',
    pill: 'rgba(22,22,24,0.08)',
    active: LightColors.accent,
    inactive: LightColors.textSub,
  },
} as const;

// The video feed is always dark, so the capsule there is always dark glass.
const ALWAYS_DARK = new Set(['index']);

interface Props extends TabBarProps {
  items: CapsuleItem[];
}

function CapsuleTabBar({ state, descriptors, navigation, items }: Props) {
  const progress = useTabBarProgress();
  const scheme = useColorScheme();
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const routes = items
    .map(item => ({ item, route: state.routes.find(r => r.name === item.name) }))
    .filter((x): x is { item: CapsuleItem; route: (typeof state.routes)[number] } => !!x.route);

  const focusedName = state.routes[state.index]?.name;
  const focusedIdx = routes.findIndex(r => r.route.name === focusedName);
  const dark = scheme === 'dark' || ALWAYS_DARK.has(focusedName ?? '');
  const g = dark ? GLASS.dark : GLASS.light;

  const barWidth = width - BAR.sideMargin * 2;
  const itemWidth = barWidth / Math.max(1, routes.length);

  // Selected pill slides between tabs.
  const pillX = useSharedValue(focusedIdx * itemWidth);
  useEffect(() => {
    if (focusedIdx >= 0) pillX.value = withSpring(focusedIdx * itemWidth, SPRING);
  }, [focusedIdx, itemWidth, pillX]);

  // New screen: start expanded.
  useEffect(() => {
    progress.value = withSpring(0, SPRING);
  }, [focusedName, progress]);

  // Uniform scale about the centre: matches the reference (bottom gap 23 → 27 pt).
  const capsuleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, BAR.compactScale], Extrapolation.CLAMP) }],
  }));
  const pillStyle = useAnimatedStyle(() => ({ transform: [{ translateX: pillX.value }] }));

  return (
    <View pointerEvents="box-none" style={[styles.host, { bottom: barBottomGap(bottom) }]}>
      <Animated.View style={[styles.shadow, capsuleStyle]}>
      <View style={[styles.capsule, { width: barWidth, borderColor: g.stroke }]}>
        {Platform.OS === 'ios' ? (
          <>
            <BlurView tint={g.tint} intensity={80} style={StyleSheet.absoluteFill} />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: g.fill }]} />
          </>
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: g.fallback }]} />
        )}

        <Animated.View
          pointerEvents="none"
          style={[
            styles.pill,
            { backgroundColor: g.pill, left: (itemWidth - BAR.pillWidth) / 2 },
            pillStyle,
          ]}
        />

        {routes.map(({ item, route }, i) => {
          const focused = i === focusedIdx;
          const options = descriptors[route.key]?.options;
          return (
            <TabButton
              key={route.key}
              item={item}
              focused={focused}
              width={itemWidth}
              color={focused ? g.active : g.inactive}
              progress={progress}
              accessibilityLabel={options?.tabBarAccessibilityLabel ?? `${item.title}, tab, ${i + 1} of ${routes.length}`}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                progress.value = withSpring(0, SPRING);
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
              }}
              onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
            />
          );
        })}
      </View>
      </Animated.View>
    </View>
  );
}

interface TabButtonProps {
  item: CapsuleItem;
  focused: boolean;
  width: number;
  color: string;
  progress: SharedValue<number>;
  accessibilityLabel: string;
  onPress: () => void;
  onLongPress: () => void;
}

const TabButton = memo(function TabButton({
  item, focused, width, color, progress, accessibilityLabel, onPress, onLongPress,
}: TabButtonProps) {
  // Labels fade out over the first half of the collapse; the icon settles into the centre.
  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5], [1, 0], Extrapolation.CLAMP),
  }));
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, 7], Extrapolation.CLAMP) }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.item, { width }, pressed && styles.pressed]}
    >
      <Animated.View style={iconStyle}>
        <Ionicons name={focused ? item.icon : item.iconOutline} size={BAR.icon} color={color} />
      </Animated.View>
      <Animated.View style={labelStyle}>
        <Text
          numberOfLines={1}
          maxFontSizeMultiplier={MAX_SCALE_CHROME}
          style={[styles.label, { color }]}
        >
          {item.title}
        </Text>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  host: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  capsule: {
    height: BAR.height,
    borderRadius: BAR.height / 2,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    borderRadius: BAR.height / 2,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
  },
  pill: {
    position: 'absolute',
    top: (BAR.height - BAR.pillHeight) / 2,
    width: BAR.pillWidth,
    height: BAR.pillHeight,
    borderRadius: BAR.pillHeight / 2,
  },
  item: { height: BAR.height, alignItems: 'center', justifyContent: 'center', gap: 2 },
  pressed: { opacity: 0.6 },
  label: { ...T.caption2, fontWeight: '600' },
});

export default memo(CapsuleTabBar);
