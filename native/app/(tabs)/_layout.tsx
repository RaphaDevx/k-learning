import React, { createContext, useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColors, T, MAX_SCALE_CHROME } from '../../constants/theme';

type ScrollCtx = { onScroll: (dy: number) => void };
const ScrollContext = createContext<ScrollCtx>({ onScroll: () => {} });
export const useScrollContext = () => useContext(ScrollContext);

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const TABS: { name: string; title: string; icon: IconName; iconOutline: IconName }[] = [
  { name: 'home',       title: 'Home',      icon: 'home',          iconOutline: 'home-outline' },
  { name: 'index',      title: 'Feed',      icon: 'flash',         iconOutline: 'flash-outline' },
  { name: 'flashcards', title: 'Karten',    icon: 'albums',        iconOutline: 'albums-outline' },
  { name: 'exam',       title: 'Prüfungen', icon: 'document-text', iconOutline: 'document-text-outline' },
  { name: 'profile',    title: 'Profil',    icon: 'person',        iconOutline: 'person-outline' },
];

export default function TabLayout() {
  const c = useColors();

  return (
    <ScrollContext.Provider value={{ onScroll: () => {} }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: c.accent,
          tabBarInactiveTintColor: c.textSub,
          // Keine feste Höhe: System berücksichtigt Safe-Area unten und Dynamic Type.
          tabBarStyle: {
            backgroundColor: c.tabBar,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: c.separator,
            position: 'absolute',
            elevation: 0,
          },
        }}
      >
        {TABS.map((t, i) => (
          <Tabs.Screen
            key={t.name}
            name={t.name}
            options={{
              title: t.title,
              tabBarAccessibilityLabel: `${t.title}, tab, ${i + 1} of ${TABS.length}`,
              tabBarLabel: ({ color }) => (
                <Text
                  numberOfLines={1}
                  maxFontSizeMultiplier={MAX_SCALE_CHROME}
                  style={{ ...T.caption2, fontWeight: '500', color }}
                >
                  {t.title}
                </Text>
              ),
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? t.icon : t.iconOutline} size={24} color={color} />
              ),
            }}
          />
        ))}

        {/* dashboard nicht mehr als Tab — bleibt für direkte Navigation */}
        <Tabs.Screen name="dashboard" options={{ href: null }} />
      </Tabs>
    </ScrollContext.Provider>
  );
}
