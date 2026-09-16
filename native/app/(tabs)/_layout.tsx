import React, { createContext, useContext } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../constants/theme';

type ScrollCtx = { onScroll: (dy: number) => void };
const ScrollContext = createContext<ScrollCtx>({ onScroll: () => {} });
export const useScrollContext = () => useContext(ScrollContext);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPad = insets.bottom > 0 ? insets.bottom : 8;

  return (
    <ScrollContext.Provider value={{ onScroll: () => {} }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: C.accentLight,
          tabBarInactiveTintColor: C.textMuted,
          tabBarStyle: {
            backgroundColor: 'rgba(251,249,245,0.97)',
            borderTopWidth: 1,
            borderTopColor: C.border,
            height: 64,
            paddingBottom: bottomPad,
            paddingTop: 6,
            position: 'absolute',
            elevation: 0,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600' as const,
            letterSpacing: 0.2,
          },
        }}
      >
        {/* 1 — Home: Kursübersicht */}
        <Tabs.Screen name="home" options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }} />

        {/* 2 — Feed: Video-Reel */}
        <Tabs.Screen name="index" options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'flash' : 'flash-outline'} size={22} color={color} />
          ),
        }} />

        {/* 3 — Karten: Flashcard-Decks */}
        <Tabs.Screen name="flashcards" options={{
          title: 'Karten',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'albums' : 'albums-outline'} size={22} color={color} />
          ),
        }} />

        {/* 4 — Prüfungen */}
        <Tabs.Screen name="exam" options={{
          title: 'Prüfungen',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={22} color={color} />
          ),
        }} />

        {/* 5 — Profil */}
        <Tabs.Screen name="profile" options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
          ),
        }} />

        {/* dashboard nicht mehr als Tab — bleibt für direkte Navigation */}
        <Tabs.Screen name="dashboard" options={{ href: null }} />
      </Tabs>
    </ScrollContext.Provider>
  );
}
