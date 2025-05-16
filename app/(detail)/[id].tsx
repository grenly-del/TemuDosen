import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const KeahlianRender = ({item}:{item:string}) => {
    return (
        <View className='bg-bgColorBox py-1 px-3 rounded-full'>
            <Text className='text-textClr text-sm'>{item}</Text>
        </View>
    )
}

const Detail = () => {
    const {id} = useLocalSearchParams()
    const insets = useSafeAreaInsets();
    const router = useRouter()
    const handleBack = () => {
        router.back()
    }

    const dataKeahlian = ['Web Developer', 'Mobile Developer', 'AI Enginner', 'Public Speaking']

    useEffect(() => {
        console.log(id)
    }, [id])
    return (
        <View className='flex-1'>
            <TouchableWithoutFeedback onPress={handleBack}>
                <View style={{ paddingTop: insets.top}}>
                    <View className='flex flex-row items-center py-5 px-4 bg-white gap-x-3'>
                    <FontAwesome name="angle-left" color="#424242" size={25} />
                    <Text className='text-xl font-semibold'>
                        Kembali
                    </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View className='bg-white w-full h-full px-4 relative overflow-auto flex-1'>
                <View className='rounded-2xl w-full h-[190px] overflow-hidden'>
                    <Image source={require('../../assets/images/foto-1.png')} className='w-full h-full' resizeMode='cover'/>
                </View>
                <View className='mt-10'>
                    <View className='flex flex-row items-center gap-x-4'>
                        <FontAwesome5 name='user-tag' color='#416FDF' size={20}/>
                        <Text className='text-xl text-textClr font-semibold'>Tentang</Text>
                    </View>
                    <View className='flex flex-row justify-between mt-5'>
                        <View className='pl-11 flex gap-y-[3px]'>
                            <Text className='font-semibold text-textClr text-[15px]'>Nama</Text>
                            <Text className='font-semibold text-textClr text-[15px]'>Fakultas</Text>
                            <Text className='font-semibold text-textClr text-[15px]'>Jabatan</Text>
                        </View>
                        <View className='flex gap-y-2'>
                            <Text className='text-right'>Grantly Antonio Edward Sorongan</Text>
                            <Text className='text-right'>Ilmu Komputer</Text>
                            <Text className='text-right'>Dosen</Text>
                        </View>
                    </View>
                </View>
                <View className='mt-10'>
                    <View className='flex flex-row items-center gap-x-4'>
                        <Ionicons name='list-circle' color='#416FDF' size={22}/>
                        <Text className='text-xl text-textClr font-semibold'>Keahlian</Text>
                    </View>
                    <View className='ml-10 mt-5'>
                        <FlatList 
                            data={dataKeahlian}
                            renderItem={KeahlianRender}
                            contentContainerClassName='flex flex-row gap-2 flex-wrap'
                        />

                    </View>
                </View>
                <TouchableHighlight onPress={() => router.back()}>
                    <View className='bg-primary py-2 rounded-lg px-5 flex gap-x-2 flex-row items-center absolute right-5 -bottom-60'>
                        <View className='w-10 h-10 bg-white flex justify-center items-center rounded-full'>
                            <FontAwesome name='paper-plane' size={17} color='#416FDF' className='z-10'/>
                        </View>
                        <Text className='text-lg text-white'>Atur Jadwal</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default Detail;
