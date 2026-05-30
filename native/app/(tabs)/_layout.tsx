import { Tabs } from 'expo-router';
import { Text } from 'react-native';

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopColor: '#1f2937',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚡" label="Feed" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Lernen',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📚" label="Lernen" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="flashcards"
        options={{
          title: 'Karten',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🃏" label="Karten" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" label="Profil" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
