import CardList from '@/components/CardList';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { DataType } from '.';

const data: DataType[] = [
  {
    id: '01',
    image: require('../../assets/images/foto-1.png'),
    nama: 'Stenly Pungus  M.Com Phd',
    jabatan: 'Kaprodi Sistem Informasi',
    fakultas: 'Ilmu Komputer',
    status: true,
  },
  {
    id: '02',
    image: require('../../assets/images/foto-1.png'),
    nama: 'Stenly Adam  M.Com',
    jabatan: 'Dosen',
    fakultas: 'Ilmu Komputer',
    status: false,
  },
  {
    id: '03',
    image: require('../../assets/images/foto-1.png'),
    nama: 'Green Sandakh  M.Com',
    jabatan: 'Dosen',
    fakultas: 'Ilmu Komputer',
    status: false,
  },
];

const InfoRow = ({ iconName, label, value, iconLibrary = 'FontAwesome5' }: { 
    iconName: string, 
    label: string, 
    value: string,
    iconLibrary?: 'FontAwesome5' | 'Ionicons'
}) => {
    const IconComponent = iconLibrary === 'Ionicons' ? Ionicons : FontAwesome5;
    
    return (
        <View className='flex flex-row items-start py-3 border-b border-gray-100 last:border-b-0'>
            <View className='w-8 flex items-center justify-center mt-1'>
                <IconComponent name={iconName as any} color='#416FDF' size={18}/>
            </View>
            <View className='flex-1 ml-3'>
                <Text className='text-gray-500 text-xs mb-1'>{label}</Text>
                <Text className='text-gray-900 text-base font-medium'>{value}</Text>
            </View>
        </View>
    );
};

const Profile = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Fungsi logout - redirect ke halaman login
    router.replace('/login');
  };

  const handleEditProfile = () => {
    // Fungsi untuk edit profile (bisa ditambahkan nanti)
    console.log('Edit profile');
  };

  return (
    <ScrollView 
      className='flex-1 bg-gray-50' 
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section with Photo */}
      <View className='bg-white px-4 pt-6 pb-6'>
        <View className='items-center'>
          <View className='relative'>
            <View className='rounded-full w-32 h-32 overflow-hidden border-4 border-white shadow-lg'>
              <Image 
                source={require('../../assets/images/foto-1.png')} 
                className='w-full h-full' 
                resizeMode='cover'
              />
            </View>
            <TouchableOpacity 
              onPress={handleEditProfile}
              className='absolute bottom-0 right-0 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-md'
            >
              <FontAwesome5 name='pen' size={14} color="white"/>
            </TouchableOpacity>
          </View>
          <Text className='text-2xl font-bold text-gray-900 mt-4'>Grantly Sorongan</Text>
          <Text className='text-base text-gray-600 mt-1'>Mahasiswa Informatika</Text>
        </View>
      </View>

      {/* Biodata Section */}
      <View className='bg-white mt-3 px-4 py-5'>
        <View className='flex flex-row items-center justify-between mb-4'>
          <View className='flex flex-row items-center gap-x-3'>
            <FontAwesome5 name='user-tag' size={22} color="#416FDF"/>
            <Text className='text-xl text-gray-900 font-bold'>Biodata</Text>
          </View>
          <TouchableOpacity onPress={handleEditProfile}>
            <FontAwesome5 name='user-cog' size={18} color="#416FDF" />
          </TouchableOpacity>
        </View>
        
        <View className='bg-gray-50 rounded-xl p-4'>
          <InfoRow 
            iconName='user' 
            label='Nama Lengkap' 
            value='Grantly Sorongan'
          />
          <InfoRow 
            iconName='university' 
            label='Fakultas' 
            value='Ilmu Komputer'
          />
          <InfoRow 
            iconName='graduation-cap' 
            label='Jurusan' 
            value='Informatika'
          />
          <InfoRow 
            iconName='id-card' 
            label='NIM' 
            value='1234567890'
          />
          <InfoRow 
            iconName='envelope' 
            label='Email' 
            value='grantly.sorongan@student.unklab.ac.id'
          />
          <InfoRow 
            iconName='phone' 
            label='No. Telepon' 
            value='+62 812-3456-7890'
          />
        </View>
      </View>

      {/* Rekomendasi Section */}
      <View className='bg-white mt-3 px-4 py-5'>
        <View className='flex flex-row items-center gap-x-3 mb-4'>
          <FontAwesome5 name='history' size={22} color="#416FDF"/>
          <Text className='text-xl text-gray-900 font-bold'>Rekomendasi Dosen</Text>
        </View>
        <View>
          <FlatList
            data={data}
            renderItem={CardList}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4, height: 270 }}
            className='py-2'
          />
        </View>
      </View>

      {/* Statistik Section */}
      <View className='bg-white mt-3 px-4 py-5'>
        <View className='flex flex-row items-center gap-x-3 mb-4'>
          <Ionicons name='stats-chart' size={22} color="#416FDF"/>
          <Text className='text-xl text-gray-900 font-bold'>Statistik</Text>
        </View>
        <View className='flex flex-row gap-3'>
          <View className='flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100'>
            <View className='flex flex-row items-center gap-x-2 mb-2'>
              <Ionicons name='people-outline' size={20} color="#416FDF"/>
              <Text className='text-xs text-gray-600 font-medium'>Dosen Dihubungi</Text>
            </View>
            <Text className='text-2xl font-bold text-blue-600'>5</Text>
          </View>
          <View className='flex-1 bg-green-50 rounded-xl p-4 border border-green-100'>
            <View className='flex flex-row items-center gap-x-2 mb-2'>
              <Ionicons name='calendar-outline' size={20} color="#10B981"/>
              <Text className='text-xs text-gray-600 font-medium'>Jadwal Aktif</Text>
            </View>
            <Text className='text-2xl font-bold text-green-600'>3</Text>
          </View>
        </View>
      </View>
      
      {/* Tombol Keluar */}
      <View className='px-4 mt-3 mb-5'>
        <TouchableOpacity 
          onPress={handleLogout}
          className='flex flex-row items-center justify-center gap-x-3 py-4 px-6 rounded-xl bg-red-50 border-2 border-red-200 active:bg-red-100'
        >
          <FontAwesome5 name="sign-out-alt" size={20} color="#EF4444" />
          <Text className='text-lg font-semibold text-red-600'>Keluar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Profile
