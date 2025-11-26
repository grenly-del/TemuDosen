import CardList from '@/components/CardList';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useMemo } from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export interface DataType {
  id: string;
  image: any;
  nama: string;
  jabatan: string;
  fakultas: string;
  status: boolean;
}

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'dosen' | 'mahasiswa'>('dosen');
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  // Dapatkan daftar fakultas unik dari data
  const faculties = useMemo(() => {
    const uniqueFaculties = Array.from(new Set(lecturerData.map(item => item.fakultas)));
    return ['Semua', ...uniqueFaculties];
  }, []);

  // Filter data berdasarkan search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return lecturerData;
    }
    return lecturerData.filter(item => 
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fakultas.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Filter data berdasarkan fakultas yang dipilih
  const filteredByFaculty = useMemo(() => {
    if (!selectedFaculty || selectedFaculty === 'Semua') {
      return lecturerData;
    }
    return lecturerData.filter(item => item.fakultas === selectedFaculty);
  }, [selectedFaculty]);

  // Data untuk kategori
  const popularLecturers = lecturerData.filter(item => item.status);
  const allLecturers = filteredByFaculty;

  return (
    <ScrollView 
      className="flex-1 bg-gray-50" 
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View className="bg-white px-4 pt-6 pb-4">
        <Text className="text-2xl font-bold text-gray-900 mb-1">Selamat Datang!</Text>
        <Text className="text-base text-gray-600">Cari dosen atau mahasiswa favoritmu</Text>
      </View>

      {/* Search Section */}
      <View className="bg-white px-4 pt-4 pb-4">
        {/* Search Type Toggle */}
        <View className="flex-row gap-2 mb-3">
          <TouchableOpacity
            onPress={() => setSearchType('dosen')}
            className={`flex-1 py-2 px-4 rounded-xl border-2 ${
              searchType === 'dosen' 
                ? 'bg-blue-50 border-blue-500' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <View className="flex-row items-center justify-center gap-x-2">
              <FontAwesome5 
                name="chalkboard-teacher" 
                size={16} 
                color={searchType === 'dosen' ? '#416FDF' : '#6B7280'} 
              />
              <Text className={`font-semibold ${
                searchType === 'dosen' ? 'text-blue-600' : 'text-gray-600'
              }`}>
                Dosen
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSearchType('mahasiswa')}
            className={`flex-1 py-2 px-4 rounded-xl border-2 ${
              searchType === 'mahasiswa' 
                ? 'bg-blue-50 border-blue-500' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <View className="flex-row items-center justify-center gap-x-2">
              <FontAwesome5 
                name="user-graduate" 
                size={16} 
                color={searchType === 'mahasiswa' ? '#416FDF' : '#6B7280'} 
              />
              <Text className={`font-semibold ${
                searchType === 'mahasiswa' ? 'text-blue-600' : 'text-gray-600'
              }`}>
                Mahasiswa
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
          <FontAwesome name="search" color="#6B7280" size={18} />
          <TextInput
            placeholder={searchType === 'dosen' ? 'Cari dosen...' : 'Cari mahasiswa...'}
            className="flex-1 text-base ml-3 text-gray-900"
            placeholderTextColor="#9CA3AF"
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

      {/* Search Results */}
      {searchQuery.trim() && (
        <View className="bg-white mt-3 px-4 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-x-2">
              <Ionicons name="search-outline" size={20} color="#416FDF" />
              <Text className="text-lg font-bold text-gray-900">
                Hasil Pencarian
              </Text>
            </View>
            <Text className="text-sm text-gray-500">
              {filteredData.length} hasil
            </Text>
          </View>
          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              renderItem={CardList}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4, height: 270 }}
              className="py-2"
            />
          ) : (
            <View className="py-8 items-center">
              <Ionicons name="search-outline" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 text-base mt-3">
                Tidak ada hasil untuk "{searchQuery}"
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                Coba kata kunci lain
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Dosen Terpopuler Section */}
      {!searchQuery.trim() && (
        <>
          <View className="bg-white mt-3 px-4 py-4">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-x-3">
                <View className="bg-yellow-100 p-2 rounded-lg">
                  <FontAwesome5 name="star" size={18} color="#F59E0B" />
                </View>
                <Text className="text-xl font-bold text-gray-900">Dosen Terpopuler</Text>
              </View>
              <TouchableOpacity>
                <Text className="text-blue-600 text-sm font-medium">Lihat semua</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={popularLecturers}
              renderItem={CardList}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4, height: 270 }}
              className="py-2"
            />
          </View>

          {/* Dosen Fakultas Section */}
          <View className="bg-white mt-3 px-4 py-4">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-x-3">
                <View className="bg-blue-100 p-2 rounded-lg">
                  <FontAwesome5 name="university" size={18} color="#416FDF" />
                </View>
                <Text className="text-xl font-bold text-gray-900">Dosen Fakultas</Text>
              </View>
              <TouchableOpacity>
                <Text className="text-blue-600 text-sm font-medium">Lihat semua</Text>
              </TouchableOpacity>
            </View>
            
            {/* Filter Fakultas */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Filter berdasarkan Fakultas:</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 4 }}
              >
                <View className="flex-row gap-2">
                  {faculties.map((faculty, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedFaculty(faculty === 'Semua' ? null : faculty)}
                      className={`px-4 py-2 rounded-full border-2 ${
                        (selectedFaculty === null && faculty === 'Semua') || selectedFaculty === faculty
                          ? 'bg-blue-500 border-blue-500'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <Text className={`text-sm font-medium ${
                        (selectedFaculty === null && faculty === 'Semua') || selectedFaculty === faculty
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}>
                        {faculty}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {allLecturers.length > 0 ? (
              <FlatList
                data={allLecturers}
                renderItem={CardList}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 4, height: 270 }}
                className="py-2"
              />
            ) : (
              <View className="py-8 items-center">
                <Ionicons name="school-outline" size={48} color="#D1D5DB" />
                <Text className="text-gray-500 text-base mt-3">
                  Tidak ada dosen di fakultas ini
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Coba pilih fakultas lain
                </Text>
              </View>
            )}
          </View>

          {/* Quick Access Section */}
          <View className="bg-white mt-3 px-4 py-4 mb-4">
            <View className="flex-row items-center gap-x-3 mb-4">
              <View className="bg-green-100 p-2 rounded-lg">
                <Ionicons name="flash-outline" size={18} color="#10B981" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Akses Cepat</Text>
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <View className="items-center">
                  <View className="bg-blue-500 w-12 h-12 rounded-full items-center justify-center mb-2">
                    <FontAwesome5 name="calendar-alt" size={20} color="white" />
                  </View>
                  <Text className="text-sm font-semibold text-gray-900 mt-1">Jadwal Saya</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-purple-50 rounded-xl p-4 border border-purple-100">
                <View className="items-center">
                  <View className="bg-purple-500 w-12 h-12 rounded-full items-center justify-center mb-2">
                    <FontAwesome5 name="comments" size={20} color="white" />
                  </View>
                  <Text className="text-sm font-semibold text-gray-900 mt-1">Dihubungi</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Index;
