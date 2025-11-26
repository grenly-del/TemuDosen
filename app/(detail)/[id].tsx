import { DataType } from '@/app/(students)';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Data dosen (sama dengan di index.tsx)
const lecturerData: DataType[] = [
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

const getLecturerById = (id: string): DataType | undefined => {
  return lecturerData.find(lecturer => lecturer.id === id);
};

const KeahlianRender = ({item}:{item:string}) => {
    return (
        <View className='bg-blue-50 py-2 px-4 rounded-full border border-blue-100'>
            <Text className='text-blue-700 text-sm font-medium'>{item}</Text>
        </View>
    )
}

const InfoRow = ({ icon, label, value, iconName, iconLibrary = 'FontAwesome5' }: { 
    icon?: any, 
    label: string, 
    value: string,
    iconName?: string,
    iconLibrary?: 'FontAwesome5' | 'Ionicons'
}) => {
    const IconComponent = iconLibrary === 'Ionicons' ? Ionicons : FontAwesome5;
    
    return (
        <View className='flex flex-row items-start py-3 border-b border-gray-100 last:border-b-0'>
            <View className='w-8 flex items-center justify-center mt-1'>
                {icon || (iconName && <IconComponent name={iconName as any} color='#416FDF' size={18}/>)}
            </View>
            <View className='flex-1 ml-3'>
                <Text className='text-gray-500 text-xs mb-1'>{label}</Text>
                <Text className='text-gray-900 text-base font-medium'>{value}</Text>
            </View>
        </View>
    );
}

const Detail = () => {
    const {id} = useLocalSearchParams()
    const insets = useSafeAreaInsets();
    const router = useRouter()
    const [lecturer, setLecturer] = useState<DataType | undefined>(undefined);

    const handleBack = () => {
        router.back()
    }

    // Ensure id is a string
    const lecturerId = Array.isArray(id) ? id[0] : id || '';

    // Sample data untuk informasi lengkap (bisa diganti dengan data dari API)
    const dataKeahlian = ['Web Development', 'Mobile Development', 'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Public Speaking']
    const pendidikan = 'S3 - Doktor Ilmu Komputer, Universitas Indonesia'
    const pengalaman = '15+ tahun pengalaman mengajar dan penelitian di bidang Teknologi Informasi'
    const email = 'grantly.sorongan@unklab.ac.id'
    const telepon = '+62 812-3456-7890'
    const alamat = 'Gedung Fakultas Ilmu Komputer, Kampus UNKLAB, Manado'
    const penelitian = 'Machine Learning, Deep Learning, Computer Vision, Natural Language Processing'
    
    // Koordinat lokasi dosen (contoh: Kampus UNKLAB Manado)
    const latitude = -1.4852;
    const longitude = 124.8419;
    
    const handleOpenMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url).catch(err => console.error('Error opening maps:', err));
    };

    useEffect(() => {
        const lecturerData = getLecturerById(lecturerId);
        setLecturer(lecturerData);
    }, [lecturerId])

    if (!lecturer) {
        return (
            <View className='flex-1 bg-gray-50 justify-center items-center'>
                <Text className='text-gray-500'>Memuat data dosen...</Text>
            </View>
        );
    }

    return (
        <View className='flex-1 bg-gray-50'>
            {/* Header */}
            <View style={{ paddingTop: insets.top }} className='bg-white'>
                <TouchableOpacity onPress={handleBack} className='flex flex-row items-center py-4 px-4 gap-x-3'>
                    <FontAwesome name="angle-left" color="#424242" size={25} />
                    <Text className='text-xl font-semibold text-gray-800'>Kembali</Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                className='flex-1' 
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Map Section */}
                <View className='bg-white px-4 pt-6 pb-4'>
                    <View className='mt-0'>
                        <View className='flex flex-row items-center gap-x-2 mb-2'>
                            <Ionicons name='location' size={18} color='#416FDF' />
                            <Text className='text-sm font-semibold text-gray-700'>Lokasi Dosen</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={handleOpenMaps}
                            activeOpacity={0.8}
                            className='rounded-xl overflow-hidden border border-gray-200 shadow-sm'
                        >
                            <View className='relative w-full h-[180px] bg-blue-50'>
                                {/* Map Placeholder dengan Icon */}
                                <View className='absolute inset-0 flex items-center justify-center'>
                                    <View className='items-center'>
                                        <View className='bg-white p-4 rounded-full shadow-lg mb-3'>
                                            <Ionicons name='location' size={32} color='#416FDF' />
                                        </View>
                                        <View className='bg-white px-4 py-2 rounded-full flex flex-row items-center gap-x-2 border border-blue-200'>
                                            <Ionicons name='navigate' size={18} color='#416FDF' />
                                            <Text className='text-sm font-semibold text-blue-600'>Buka di Google Maps</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Marker Pin */}
                                <View style={{ 
                                    position: 'absolute', 
                                    top: '50%', 
                                    left: '50%', 
                                    transform: [{ translateX: -20 }, { translateY: -20 }]
                                }}>
                                    <Ionicons name='location' size={40} color='#EF4444' />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Text className='text-xs text-gray-500 mt-2 ml-1'>{alamat}</Text>
                    </View>
                    
                    {/* Name and Status with Profile Photo */}
                    <View className='mt-6'>
                        <View className='flex flex-row items-start gap-x-4 mb-2'>
                            {/* Foto Profile Bulat */}
                            <View className='rounded-full overflow-hidden border-2 border-white shadow-md' style={{ width: 70, height: 70 }}>
                                <Image 
                                    source={lecturer.image} 
                                    className='w-full h-full' 
                                    resizeMode='cover'
                                />
                            </View>
                            
                            {/* Nama dan Info */}
                            <View className='flex-1'>
                                <View className='flex flex-row items-center justify-between mb-1'>
                                    <Text className='text-2xl font-bold text-gray-900 flex-1' numberOfLines={2}>
                                        {lecturer.nama}
                                    </Text>
                                    <View className={`px-3 py-1 rounded-full ${lecturer.status ? 'bg-green-100' : 'bg-gray-100'}`}>
                                        <Text className={`text-xs font-semibold ${lecturer.status ? 'text-green-700' : 'text-gray-600'}`}>
                                            {lecturer.status ? 'Aktif' : 'Non-Aktif'}
                                        </Text>
                                    </View>
                                </View>
                                <Text className='text-lg text-blue-600 font-medium'>{lecturer.jabatan}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Biodata Section */}
                <View className='bg-white mt-3 px-4 py-5'>
                    <View className='flex flex-row items-center gap-x-3 mb-4'>
                        <FontAwesome5 name='user-tag' color='#416FDF' size={22}/>
                        <Text className='text-xl text-gray-900 font-bold'>Biodata</Text>
                    </View>
                    
                    <View className='bg-gray-50 rounded-xl p-4'>
                        <InfoRow 
                            iconName='user' 
                            label='Nama Lengkap' 
                            value={lecturer.nama}
                        />
                        <InfoRow 
                            iconName='briefcase' 
                            label='Jabatan' 
                            value={lecturer.jabatan}
                        />
                        <InfoRow 
                            iconName='university' 
                            label='Fakultas' 
                            value={lecturer.fakultas}
                        />
                        <InfoRow 
                            iconName='graduation-cap' 
                            label='Pendidikan' 
                            value={pendidikan}
                        />
                        <InfoRow 
                            iconName='chart-line' 
                            label='Pengalaman' 
                            value={pengalaman}
                        />
                    </View>
                </View>

                {/* Kontak Section */}
                <View className='bg-white mt-3 px-4 py-5'>
                    <View className='flex flex-row items-center gap-x-3 mb-4'>
                        <Ionicons name='call-outline' color='#416FDF' size={22}/>
                        <Text className='text-xl text-gray-900 font-bold'>Kontak</Text>
                    </View>
                    
                    <View className='bg-gray-50 rounded-xl p-4'>
                        <InfoRow 
                            iconName='envelope' 
                            label='Email' 
                            value={email}
                        />
                        <InfoRow 
                            iconName='phone' 
                            label='Telepon' 
                            value={telepon}
                        />
                        <InfoRow 
                            iconName='map-marker-alt' 
                            label='Alamat' 
                            value={alamat}
                        />
                    </View>
                </View>

                {/* Keahlian Section */}
                <View className='bg-white mt-3 px-4 py-5'>
                    <View className='flex flex-row items-center gap-x-3 mb-4'>
                        <Ionicons name='list-circle' color='#416FDF' size={22}/>
                        <Text className='text-xl text-gray-900 font-bold'>Keahlian</Text>
                    </View>
                    <View className='flex flex-row flex-wrap gap-2'>
                        {dataKeahlian.map((item, index) => (
                            <KeahlianRender key={index} item={item} />
                        ))}
                    </View>
                </View>

                {/* Penelitian Section */}
                <View className='bg-white mt-3 px-4 py-5'>
                    <View className='flex flex-row items-center gap-x-3 mb-4'>
                        <FontAwesome6 name='flask' color='#416FDF' size={22}/>
                        <Text className='text-xl text-gray-900 font-bold'>Bidang Penelitian</Text>
                    </View>
                    <View className='bg-gray-50 rounded-xl p-4'>
                        <Text className='text-gray-700 text-base leading-6'>{penelitian}</Text>
                    </View>
                </View>

                {/* Spacing untuk tombol */}
                <View className='h-4' />
            </ScrollView>

            {/* Fixed Button at Bottom */}
            <View className='absolute bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-gray-200' style={{ paddingBottom: insets.bottom + 16 }}>
                <TouchableHighlight 
                    onPress={() => router.push({
                        pathname: '/(schedule)/[id]',
                        params: {
                            id: lecturerId
                        }
                    })}
                    underlayColor='#3454B4'
                    className='bg-primary rounded-xl'
                >
                    <View className='py-4 px-5 flex flex-row items-center justify-center gap-x-3'>
                        <View className='w-10 h-10 bg-white/20 flex justify-center items-center rounded-full'>
                            <FontAwesome name='paper-plane' size={18} color='white'/>
                        </View>
                        <Text className='text-lg text-white font-semibold'>Atur Jadwal Konsultasi</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default Detail;
