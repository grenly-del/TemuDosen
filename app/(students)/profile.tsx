import CardList from '@/components/CardList';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
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
const Profile = () => {
  
  return (
    <ScrollView className='w-full h-full bg-white py-2 px-4'>
      <View className='w-full rounded-xl overflow-hidden relative'>
        <Image source={require('../../assets/images/foto-1.png')} className='w-full h-[203px]'/>
        <View className='bg-[#FBFF84] w-[30px] h-[30px] flex justify-center items-center absolute bottom-3 right-5 rounded-full'>
            <FontAwesome5 name='pen' size={17} color="#454545"/>
        </View>
      </View>
      <View className='flex flex-row justify-between items-end mt-9'>
          <View className='flex flex-row items-center gap-x-3'>
            <FontAwesome5 name='user-tag' size={22} color="#416FDF"/>
            <Text className='text-xl font-semibold text-primary'>Biodata</Text>
          </View>
          <FontAwesome5 name='user-cog' size={17} color="#454545" />
      </View>
      <View className='flex flex-row justify-between items-center mt-5'>
        <View className='ml-11 flex gap-y-1'>
          <Text className='font-semibold text-[15px]'>Nama</Text>
          <Text className='font-semibold text-[15px]'>Fakultas</Text>
          <Text className='font-semibold text-[15px]'>Jurusan</Text>
        </View>
        <View className='flex gap-y-1'>
          <Text className='text-left'>Grantly Sorongan</Text>
          <Text className='text-left'>Ilmu Komputer</Text>
          <Text className='text-left'>Informatika</Text>
        </View>
      </View>
      <View className='w-full h-[0.9px] bg-[#b4b4b4] mt-5'></View>
      <View className='flex flex-row items-center gap-x-3 mt-10'>
        <FontAwesome5 name='history' size={22} color="#416FDF"/>
        <Text className='text-xl font-semibold text-primary'>Rekomendasi</Text>
      </View>
      <View>
          <FlatList
          data={data}
          renderItem={CardList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0, height: 270 }}
          className='py-2 pb-5'
        />
      </View>
    </ScrollView>
  )
}

export default Profile