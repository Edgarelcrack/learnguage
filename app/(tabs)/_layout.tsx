import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';


import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'chat',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
        />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'collection',
          tabBarIcon: ({ color }) => <Feather size={28} name="book" color={color} />,
        }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'profile',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle" color={color} />,
          }}
      />
    </Tabs>
  );
}
<FontAwesome name="user-circle" size={24} color="black" />