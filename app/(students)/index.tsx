import CardList from '@/components/CardList';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { FlatList, ScrollView, Text, TextInput, View } from 'react-native';

export interface DataType {
  id: string;
  image: any;
  nama: string;
  jabatan: string;
  fakultas: string;
  status: boolean;
}

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


const Index = () => {
  
  return (
    <ScrollView className="bg-white flex-1 pt-4" contentContainerStyle={{
      paddingBottom: 20
    }}>
      <View className="flex-row items-center border border-gray-300 rounded-xl px-5 py-2 mx-4 mb-5">
        <FontAwesome name="search" color="#949494" size={20} className="mr-2" />
        <TextInput placeholder="Cari dosen ..." className="flex-1 text-base" />
      </View>
      <View>
        <Text className='px-4 mb-5 mt-2 text-xl font-semibold'>Dosen Terpopuler</Text>
        <FlatList
          data={data}
          renderItem={CardList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, height: 270 }}
          className='py-2'
        />
      </View>
      <View className='mt-5'>
        <Text className='px-4 mb-5 mt-2 text-xl font-semibold'>Dosen Fakultas</Text>
        <FlatList
          data={data}
          renderItem={CardList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, height: 270 }}
          className='py-2'
        />
      </View>
    </ScrollView>
  );
};

export default Index;
