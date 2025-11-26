import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useContacted } from '@/contexts/ContactedContext';
import { DataType } from '.';

interface ChatItem {
  id: string;
  lecturer: DataType;
  lastMessage: string;
  time: string;
  unread: number;
}

const Chat = () => {
  const { contactedLecturers } = useContacted();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data untuk chat list (dalam production, ini akan dari API)
  const chatList: ChatItem[] = contactedLecturers.map((lecturer, index) => ({
    id: lecturer.id,
    lecturer,
    lastMessage: 'Terima kasih atas konsultasinya...',
    time: '10:30',
    unread: index === 0 ? 2 : 0,
  }));

  const filteredChats = chatList.filter(chat =>
    chat.lecturer.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatPress = (lecturerId: string) => {
    // Navigate to chat detail (bisa dibuat nanti)
    console.log('Open chat with:', lecturerId);
  };

  const ChatItemCard = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      onPress={() => handleChatPress(item.id)}
      className='bg-white border-b border-gray-100 px-4 py-3 flex flex-row items-center'
      activeOpacity={0.7}
    >
      <View className='relative'>
        <View className='rounded-full overflow-hidden' style={{ width: 56, height: 56 }}>
          <Image
            source={item.lecturer.image}
            className='w-full h-full'
            resizeMode='cover'
          />
        </View>
        {item.lecturer.status && (
          <View className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white' />
        )}
      </View>
      
      <View className='flex-1 ml-3'>
        <View className='flex flex-row items-center justify-between mb-1'>
          <Text className='text-base font-semibold text-gray-900' numberOfLines={1}>
            {item.lecturer.nama}
          </Text>
          <Text className='text-xs text-gray-500'>{item.time}</Text>
        </View>
        <View className='flex flex-row items-center justify-between'>
          <Text className='text-sm text-gray-600 flex-1' numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View className='bg-blue-500 rounded-full px-2 py-0.5 ml-2'>
              <Text className='text-xs text-white font-semibold'>{item.unread}</Text>
            </View>
          )}
        </View>
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
              placeholder='Cari chat...'
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
              {contactedLecturers.length === 0 
                ? 'Belum ada chat' 
                : 'Tidak ada hasil pencarian'}
            </Text>
            <Text className='text-gray-400 text-sm mt-2 text-center px-8'>
              {contactedLecturers.length === 0
                ? 'Mulai chat dengan dosen yang sudah Anda hubungi'
                : 'Coba kata kunci lain'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Chat;

