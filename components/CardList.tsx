import { DataType } from '@/app/(students)';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';

const CardList = ({ item }: { item: DataType }) => {
    const router = useRouter()
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = screenWidth / 2 - 20; // 2 item muat layar, minus margin
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

export default CardList