import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ChatItem {
  id: string;
  studentName: string;
  studentNim: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: any;
}

const LecturerChat = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - akan diganti dengan data real dari API
  const chatList: ChatItem[] = [
    {
      id: '1',
      studentName: 'John Doe',
      studentNim: '1234567890',
      lastMessage: 'Terima kasih atas bimbingannya pak...',
      time: '10:30',
      unread: 2,
      avatar: require('../../assets/images/foto-1.png'),
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentNim: '0987654321',
      lastMessage: 'Baik pak, saya akan revisi sesuai saran...',
      time: '09:15',
      unread: 0,
      avatar: require('../../assets/images/foto-1.png'),
    },
    {
      id: '3',
      studentName: 'Bob Johnson',
      studentNim: '1122334455',
      lastMessage: 'Kapan saya bisa konsultasi lagi pak?',
      time: 'Kemarin',
      unread: 1,
      avatar: require('../../assets/images/foto-1.png'),
    },
  ];

  const filteredChats = chatList.filter(chat =>
    chat.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.studentNim.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatPress = (chatId: string) => {
    // Navigate to chat detail (bisa dibuat nanti)
    console.log('Open chat with:', chatId);
  };

  const ChatItemCard = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      onPress={() => handleChatPress(item.id)}
      className='bg-white border-b border-gray-100 px-4 py-3 flex flex-row items-center'
      activeOpacity={0.7}
    >
      <View className='relative'>
        <View className='rounded-full overflow-hidden bg-gray-200' style={{ width: 56, height: 56 }}>
          {item.avatar ? (
            <Image
              source={item.avatar}
              className='w-full h-full'
              resizeMode='cover'
            />
          ) : (
            <View className='w-full h-full items-center justify-center'>
              <FontAwesome5 name="user-graduate" size={24} color="#9CA3AF" />
            </View>
          )}
        </View>
        {item.unread > 0 && (
          <View className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white items-center justify-center'>
            <Text className='text-xs text-white font-bold'>{item.unread}</Text>
          </View>
        )}
      </View>

      <View className='flex-1 ml-3'>
        <View className='flex flex-row items-center justify-between mb-1'>
          <Text className='text-base font-semibold text-gray-900' numberOfLines={1}>
            {item.studentName}
          </Text>
          <Text className='text-xs text-gray-500'>{item.time}</Text>
        </View>
        <View className='flex flex-row items-center justify-between'>
          <Text className='text-sm text-gray-600 flex-1' numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        <Text className='text-xs text-gray-500 mt-1'>NIM: {item.studentNim}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className='flex-1 bg-gray-50'>
      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View className='bg-white px-4 pt-4 pb-3'>
          <View className='flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3'>
            <FontAwesome name="search" color="#6B7280" size={18} />
            <TextInput
              placeholder='Cari chat dengan mahasiswa...'
              className='flex-1 text-base ml-3 text-gray-900'
              placeholderTextColor='#9CA3AF'
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Chat List */}
        {filteredChats.length > 0 ? (
          <View className='bg-white mt-1'>
            <FlatList
              data={filteredChats}
              renderItem={({ item }) => <ChatItemCard item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        ) : (
          <View className='flex-1 items-center justify-center py-20'>
            <Ionicons name="chatbubbles-outline" size={64} color="#D1D5DB" />
            <Text className='text-gray-500 text-lg mt-4 font-semibold'>
              {chatList.length === 0
                ? 'Belum ada chat'
                : 'Tidak ada hasil pencarian'}
            </Text>
            <Text className='text-gray-400 text-sm mt-2 text-center px-8'>
              {chatList.length === 0
                ? 'Mulai chat dengan mahasiswa yang sudah menghubungi Anda'
                : 'Coba kata kunci lain'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LecturerChat;

