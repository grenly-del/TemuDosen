import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const Schedule = () => {
    const {id} = useLocalSearchParams()
    const insets = useSafeAreaInsets();
    const router = useRouter()
    const handleBack = () => {
        router.back()
    }
    useEffect(() => {
        console.log('Halaman Schedule')
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
                        <Text className='text-xl text-textClr font-bold'>Tentang</Text>
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
                <View className='w-full bg-gray-300 h-[0.6px] mt-7'></View>
                <View className='mt-10'>
                    <View className='flex flex-row items-center gap-x-4'>
                        <FontAwesome name="edit" color='#416FDF' size={25} />
                        <Text className='text-xl text-textClr font-bold'>Atur Jadwal</Text>
                    </View>
                    <View>
                        <View>
                            <View>
                                <View className='flex items-center flex-row gap-x-3'>
                                    <FontAwesome name="clock-o" size={20} color="#416FDF" />
                                    <Text className='text-[15px] font-semibold text-textClr'>Jam</Text>
                                </View>
                                <TextInput/>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableHighlight>
                    <View className='w-full bg-primary py-2 rounded-lg px-5 flex gap-x-2 flex-row items-center justify-center absolute -bottom-60'>
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

export default Schedule;
