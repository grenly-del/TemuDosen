import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';

interface DataType {
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

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 2 - 20; // 2 item muat layar, minus margin

const Index = () => {
  const router = useRouter()
  const renderList = ({ item }: { item: DataType }) => {
    return (
      <TouchableWithoutFeedback onPress={() => router.push({
        pathname: '/(detail)/[id]',
        params: {
          id: item.id
        }
      })}>
        <View
          className="bg-white h-full rounded-xl overflow-hidden shadow-md mx-2 relative"
          style={{ width: itemWidth }}
        >
          <Image source={item.image} className="w-full h-36" resizeMode="cover" />
          <View className="p-3">
            <Text className="text-blue-700 text-sm mb-1" numberOfLines={1} ellipsizeMode="tail">{item.jabatan}</Text>
            <Text className="text-lg font-semibold mb-1" numberOfLines={1} ellipsizeMode="tail">{item.nama}</Text>
            <Text className="text-base text-gray-700" numberOfLines={1} ellipsizeMode="tail">Fakultas {item.fakultas}</Text>
            <Text className={`text-base ${item.status ? 'text-green-600': 'text-red-700'} mt-6`}>{item.status ? 'Active' : 'Non-Active'}</Text>
          </View>
          <TouchableHighlight className='w-[35px] h-[35px] bg-primary absolute bottom-3 right-2 flex justify-center items-center rounded-full'>
            <View className=''>
              <FontAwesome name='paper-plane' size={17} color={'white'}/>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
    );
  };
 
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
          renderItem={renderList}
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
          renderItem={renderList}
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
