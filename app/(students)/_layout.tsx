import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'schedule' | 'message' | 'system';
  read: boolean;
}

const NotificationHeader = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Jadwal Disetujui',
      message: 'Jadwal konsultasi dengan Dr. John Doe telah disetujui untuk tanggal 15 Januari 2024',
      time: '2 jam yang lalu',
      type: 'schedule',
      read: false,
    },
    {
      id: '2',
      title: 'Pesan Baru',
      message: 'Anda mendapat pesan baru dari Dr. Jane Smith',
      time: '5 jam yang lalu',
      type: 'message',
      read: false,
    },
    {
      id: '3',
      title: 'Pengingat Jadwal',
      message: 'Jadwal konsultasi besok pukul 10:00 dengan Dr. Bob Johnson',
      time: '1 hari yang lalu',
      type: 'schedule',
      read: true,
    },
    {
      id: '4',
      title: 'Update Sistem',
      message: 'Aplikasi telah diperbarui dengan fitur baru',
      time: '2 hari yang lalu',
      type: 'system',
      read: true,
    },
  ]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const closeModal = () => {
    if (isMounted.current) {
      setVisible(false);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'schedule':
        return <Ionicons name="calendar" size={20} color="#416FDF" />;
      case 'message':
        return <Ionicons name="chatbubble" size={20} color="#10B981" />;
      case 'system':
        return <Ionicons name="information-circle" size={20} color="#F59E0B" />;
      default:
        return <Ionicons name="notifications" size={20} color="#6B7280" />;
    }
  };

  const NotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      onPress={() => markAsRead(item.id)}
      className={`p-4 border-b border-gray-100 ${!item.read ? 'bg-blue-50/50' : 'bg-white'}`}
    >
      <View className="flex-row gap-3">
        <View className="mt-1">
          {getNotificationIcon(item.type)}
        </View>
        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-1">
            <Text className={`text-base font-semibold flex-1 ${!item.read ? 'text-gray-900' : 'text-gray-700'}`}>
              {item.title}
            </Text>
            {!item.read && (
              <View className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
            )}
          </View>
          <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
            {item.message}
          </Text>
          <Text className="text-xs text-gray-500">{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {/* Notification Button */}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={{
          marginRight: 16,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
          <Ionicons name="notifications-outline" size={24} color="#416FDF" />
          {unreadCount > 0 && (
            <View style={{
              position: 'absolute',
              top: 6,
              right: 6,
              backgroundColor: '#EF4444',
              borderRadius: 10,
              minWidth: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 4,
            }}>
              <Text style={{
                color: 'white',
                fontSize: 10,
                fontWeight: 'bold',
              }}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Notification Modal */}
      <Modal
        transparent
        visible={visible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <View style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '80%',
            paddingTop: 20,
          }}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 pb-4 border-b border-gray-200">
              <View className="flex-row items-center gap-x-2">
                <Ionicons name="notifications" size={24} color="#416FDF" />
                <Text className="text-xl font-bold text-gray-900">
                  Notifikasi
                </Text>
                {unreadCount > 0 && (
                  <View className="bg-red-500 px-2 py-1 rounded-full">
                    <Text className="text-xs text-white font-bold">
                      {unreadCount} baru
                    </Text>
                  </View>
                )}
              </View>
              {unreadCount > 0 && (
                <TouchableOpacity onPress={markAllAsRead}>
                  <Text className="text-blue-600 text-sm font-medium">
                    Tandai semua dibaca
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <FlatList
                data={notifications}
                renderItem={({ item }) => <NotificationItem item={item} />}
                keyExtractor={(item) => item.id}
                style={{ maxHeight: 500 }}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View className="items-center justify-center py-20">
                <Ionicons name="notifications-off-outline" size={64} color="#D1D5DB" />
                <Text className="text-gray-500 text-lg mt-4 font-semibold">
                  Tidak ada notifikasi
                </Text>
                <Text className="text-gray-400 text-sm mt-2">
                  Notifikasi akan muncul di sini
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
        headerRight: () => <NotificationHeader />,
      }}>
        <Tabs.Screen name="index" options={{
          title: 'Home',
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
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
