import FontAwesome from '@expo/vector-icons/FontAwesome';
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
          elevation: 0,           // Android
          shadowOpacity: 0,       // iOS
        },
        headerTitleStyle: {
          color: '#416FDF'
        },
        headerShown: false
      }}>
          <Tabs.Screen name='index' options={{
            title: 'Home',
            tabBarStyle: {
              backgroundColor: '#fff',
            },
            headerShown: true,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
          }}/>
          <Tabs.Screen name='profile' options={{
            title: 'Profil',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
          }}/>
      </Tabs>
    </SafeAreaProvider>
  )
}

export default _layout
