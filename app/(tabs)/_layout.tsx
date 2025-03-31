import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  const screens = [
    { name: 'index', title: 'Home', icon: 'grid' as const },
    { name: 'explore', title: 'Chat', icon: 'chatbubble' as const },
    { name: 'collection', title: 'Collection', icon: 'folder' as const },
    { name: 'profile', title: 'Profile', icon: 'person' as const },
  ];
  

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#28113D',
          paddingVertical: 10,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {screens.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => {
              const animatedScale = new Animated.Value(focused ? 1.2 : 1);
              
              Animated.timing(animatedScale, {
                toValue: focused ? 1.2 : 1,
                duration: 200,
                useNativeDriver: true,
              }).start();

              return (
                <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
                  <Ionicons size={28} name={icon} color={color} />
                </Animated.View>
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}
