import { Tabs } from 'expo-router';
import CapsuleTabBar, { type CapsuleItem } from '../../components/CapsuleTabBar';
import { TabBarProgressProvider } from '../../lib/tabBar';

const TABS: CapsuleItem[] = [
  { name: 'home',       title: 'Home',      icon: 'home',          iconOutline: 'home-outline' },
  { name: 'index',      title: 'Feed',      icon: 'flash',         iconOutline: 'flash-outline' },
  { name: 'flashcards', title: 'Karten',    icon: 'albums',        iconOutline: 'albums-outline' },
  { name: 'exam',       title: 'Prüfungen', icon: 'document-text', iconOutline: 'document-text-outline' },
  { name: 'profile',    title: 'Profil',    icon: 'person',        iconOutline: 'person-outline' },
];

export default function TabLayout() {
  return (
    <TabBarProgressProvider>
      <Tabs
        // Floating capsule over the content (content scrolls beneath the glass).
        tabBar={props => <CapsuleTabBar {...props} items={TABS} />}
        screenOptions={{ headerShown: false }}
      >
        {TABS.map((t, i) => (
          <Tabs.Screen
            key={t.name}
            name={t.name}
            options={{ title: t.title, tabBarAccessibilityLabel: `${t.title}, tab, ${i + 1} of ${TABS.length}` }}
          />
        ))}

        {/* dashboard nicht mehr als Tab — bleibt für direkte Navigation */}
        <Tabs.Screen name="dashboard" options={{ href: null }} />
      </Tabs>
    </TabBarProgressProvider>
  );
}
