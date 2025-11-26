import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const _layout = () => {
  return (
    <SafeAreaProvider>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#416FDF',
        tabBarInactiveTintColor: '#878787',
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: '#416FDF'
        },
      }}>
        <Tabs.Screen name="index" options={{
          title: 'Dashboard',
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }} />
        <Tabs.Screen name="schedule-requests" options={{
          title: 'Permintaan Jadwal',
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={28} name="calendar-alt" color={color} />
          ),
        }} />
        <Tabs.Screen name="chat" options={{
          title: 'Chat',
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={28} name="comments" color={color} />
          ),
        }} />
        <Tabs.Screen name="profile" options={{
          title: 'Profil',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }} />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default _layout;

