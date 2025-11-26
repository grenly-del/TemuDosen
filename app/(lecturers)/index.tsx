import { useAuth } from "@/contexts/AuthContext";
import CardList from '@/components/CardList';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { DataType } from '@/app/(students)';

// Data dosen
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

// Data mahasiswa
interface StudentType {
  id: string;
  image: any;
  nama: string;
  nim: string;
  fakultas: string;
  jurusan: string;
  status: boolean;
}

const studentData: StudentType[] = [
  {
    id: 's01',
    image: require('../../assets/images/foto-1.png'),
    nama: 'John Doe',
    nim: '1234567890',
    fakultas: 'Ilmu Komputer',
    jurusan: 'Informatika',
    status: true,
  },
  {
    id: 's02',
    image: require('../../assets/images/foto-1.png'),
    nama: 'Jane Smith',
    nim: '0987654321',
    fakultas: 'Ilmu Komputer',
    jurusan: 'Sistem Informasi',
    status: true,
  },
  {
    id: 's03',
    image: require('../../assets/images/foto-1.png'),
    nama: 'Bob Johnson',
    nim: '1122334455',
    fakultas: 'Ilmu Komputer',
    jurusan: 'Teknik Informatika',
    status: false,
  },
];

const StudentCard = ({ item }: { item: StudentType }) => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 2 - 20;
  
  return (
    <TouchableOpacity
      onPress={() => {
        // Navigate to student detail (bisa dibuat nanti)
        console.log('Student detail:', item.id);
      }}
      className="bg-white h-full rounded-xl overflow-hidden shadow-md mx-2 relative"
      style={{ width: itemWidth }}
    >
      <View className="w-full h-36 bg-blue-100 items-center justify-center">
        <FontAwesome5 name="user-graduate" size={48} color="#416FDF" />
      </View>
      <View className="p-3">
        <Text className="text-blue-700 text-sm mb-1" numberOfLines={1}>
          NIM: {item.nim}
        </Text>
        <Text className="text-lg font-semibold mb-1" numberOfLines={1}>
          {item.nama}
        </Text>
        <Text className="text-base text-gray-700" numberOfLines={1}>
          {item.jurusan}
        </Text>
        <Text className="text-base text-gray-600 mt-1" numberOfLines={1}>
          {item.fakultas}
        </Text>
        <Text className={`text-base ${item.status ? 'text-green-600' : 'text-red-700'} mt-4`}>
          {item.status ? 'Aktif' : 'Non-Aktif'}
        </Text>
      </View>
      <TouchableOpacity className="w-[35px] h-[35px] bg-primary absolute bottom-3 right-2 flex justify-center items-center rounded-full">
        <FontAwesome name="paper-plane" size={17} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const LecturerDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'dosen' | 'mahasiswa'>('dosen');
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  // Dapatkan daftar fakultas unik dari data
  const faculties = useMemo(() => {
    const lecturerFaculties = Array.from(new Set(lecturerData.map(item => item.fakultas)));
    const studentFaculties = Array.from(new Set(studentData.map(item => item.fakultas)));
    const allFaculties = Array.from(new Set([...lecturerFaculties, ...studentFaculties]));
    return ['Semua', ...allFaculties];
  }, []);

  // Filter data berdasarkan search query
  const filteredLecturers = useMemo(() => {
    if (!searchQuery.trim()) {
      return lecturerData;
    }
    return lecturerData.filter(item => 
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fakultas.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) {
      return studentData;
    }
    return studentData.filter(item => 
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jurusan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fakultas.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Filter data berdasarkan fakultas yang dipilih
  const filteredByFaculty = useMemo(() => {
    if (!selectedFaculty || selectedFaculty === 'Semua') {
      return searchType === 'dosen' ? lecturerData : studentData;
    }
    if (searchType === 'dosen') {
      return lecturerData.filter(item => item.fakultas === selectedFaculty);
    } else {
      return studentData.filter(item => item.fakultas === selectedFaculty);
    }
  }, [selectedFaculty, searchType]);

  // Mock data - akan diganti dengan data real dari API
  const stats = {
    totalRequests: 12,
    pendingRequests: 5,
    approvedRequests: 7,
    todaySchedules: 3,
  };

  const recentRequests = [
    {
      id: '1',
      studentName: 'John Doe',
      date: '2024-01-15',
      time: '10:00',
      topic: 'Konsultasi Skripsi',
      status: 'pending',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      date: '2024-01-15',
      time: '14:00',
      topic: 'Bimbingan Tugas Akhir',
      status: 'approved',
    },
  ];

  // Data untuk kategori
  const popularLecturers = lecturerData.filter(item => item.status);
  const allData = filteredByFaculty;

  return (
    <ScrollView 
      className="flex-1 bg-gray-50" 
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View className="bg-white px-4 pt-6 pb-4">
        <Text className="text-2xl font-bold text-gray-900 mb-1">
          Selamat Datang, {user?.nama || 'Dosen'}!
        </Text>
        <Text className="text-base text-gray-600">
          Cari dosen atau mahasiswa, dan kelola jadwal konsultasi
        </Text>
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
              {searchType === 'dosen' ? filteredLecturers.length : filteredStudents.length} hasil
            </Text>
          </View>
          {((searchType === 'dosen' && filteredLecturers.length > 0) || 
            (searchType === 'mahasiswa' && filteredStudents.length > 0)) ? (
            <FlatList
              data={searchType === 'dosen' ? filteredLecturers : filteredStudents}
              renderItem={searchType === 'dosen' 
                ? CardList 
                : ({ item }) => <StudentCard item={item as StudentType} />
              }
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

      {/* Statistics Cards */}
      {!searchQuery.trim() && (
        <View className="px-4 pt-4">
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100">
            <View className="flex-row items-center gap-x-2 mb-2">
              <Ionicons name="calendar-outline" size={20} color="#416FDF" />
              <Text className="text-xs text-gray-600 font-medium">Total Permintaan</Text>
            </View>
            <Text className="text-2xl font-bold text-blue-600">{stats.totalRequests}</Text>
          </View>
          <View className="flex-1 bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <View className="flex-row items-center gap-x-2 mb-2">
              <Ionicons name="time-outline" size={20} color="#F59E0B" />
              <Text className="text-xs text-gray-600 font-medium">Menunggu</Text>
            </View>
            <Text className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</Text>
          </View>
        </View>
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-green-50 rounded-xl p-4 border border-green-100">
            <View className="flex-row items-center gap-x-2 mb-2">
              <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
              <Text className="text-xs text-gray-600 font-medium">Disetujui</Text>
            </View>
            <Text className="text-2xl font-bold text-green-600">{stats.approvedRequests}</Text>
          </View>
          <View className="flex-1 bg-purple-50 rounded-xl p-4 border border-purple-100">
            <View className="flex-row items-center gap-x-2 mb-2">
              <Ionicons name="today-outline" size={20} color="#8B5CF6" />
              <Text className="text-xs text-gray-600 font-medium">Hari Ini</Text>
            </View>
            <Text className="text-2xl font-bold text-purple-600">{stats.todaySchedules}</Text>
          </View>
        </View>
      </View>
      )}

      {/* Dosen/Mahasiswa Section */}
      {!searchQuery.trim() && (
        <>
          {searchType === 'dosen' ? (
            <>
              {/* Dosen Terpopuler Section */}
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

                {allData.length > 0 ? (
                  <FlatList
                    data={allData as DataType[]}
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
            </>
          ) : (
            <>
              {/* Mahasiswa Section */}
              <View className="bg-white mt-3 px-4 py-4">
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center gap-x-3">
                    <View className="bg-green-100 p-2 rounded-lg">
                      <FontAwesome5 name="user-graduate" size={18} color="#10B981" />
                    </View>
                    <Text className="text-xl font-bold text-gray-900">Mahasiswa</Text>
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

                {allData.length > 0 ? (
                  <FlatList
                    data={allData as StudentType[]}
                    renderItem={({ item }) => <StudentCard item={item as StudentType} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 4, height: 270 }}
                    className="py-2"
                  />
                ) : (
                  <View className="py-8 items-center">
                    <Ionicons name="people-outline" size={48} color="#D1D5DB" />
                    <Text className="text-gray-500 text-base mt-3">
                      Tidak ada mahasiswa di fakultas ini
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1">
                      Coba pilih fakultas lain
                    </Text>
                  </View>
                )}
              </View>
            </>
          )}
        </>
      )}

      {/* Quick Actions */}
      {!searchQuery.trim() && (
        <View className="px-4 pt-2">
        <View className="bg-white rounded-xl p-4 mb-4">
          <View className="flex-row items-center gap-x-3 mb-4">
            <View className="bg-blue-100 p-2 rounded-lg">
              <FontAwesome5 name="bolt" size={18} color="#416FDF" />
            </View>
            <Text className="text-xl font-bold text-gray-900">Akses Cepat</Text>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <View className="items-center">
                <View className="bg-blue-500 w-12 h-12 rounded-full items-center justify-center mb-2">
                  <FontAwesome5 name="calendar-check" size={20} color="white" />
                </View>
                <Text className="text-sm font-semibold text-gray-900 mt-1 text-center">
                  Lihat Permintaan
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-green-50 rounded-xl p-4 border border-green-100">
              <View className="items-center">
                <View className="bg-green-500 w-12 h-12 rounded-full items-center justify-center mb-2">
                  <FontAwesome5 name="clock" size={20} color="white" />
                </View>
                <Text className="text-sm font-semibold text-gray-900 mt-1 text-center">
                  Jadwal Hari Ini
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      )}

      {/* Recent Requests */}
      {!searchQuery.trim() && (
        <View className="px-4 pt-2">
        <View className="bg-white rounded-xl p-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-x-3">
              <View className="bg-orange-100 p-2 rounded-lg">
                <Ionicons name="list-outline" size={18} color="#F97316" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Permintaan Terbaru</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-blue-600 text-sm font-medium">Lihat semua</Text>
            </TouchableOpacity>
          </View>
          
          {recentRequests.map((request) => (
            <View 
              key={request.id} 
              className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100"
            >
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {request.studentName}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">{request.topic}</Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${
                  request.status === 'pending' 
                    ? 'bg-yellow-100' 
                    : 'bg-green-100'
                }`}>
                  <Text className={`text-xs font-semibold ${
                    request.status === 'pending' 
                      ? 'text-yellow-700' 
                      : 'text-green-700'
                  }`}>
                    {request.status === 'pending' ? 'Menunggu' : 'Disetujui'}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-x-4 mt-2">
                <View className="flex-row items-center gap-x-1">
                  <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                  <Text className="text-xs text-gray-600">{request.date}</Text>
                </View>
                <View className="flex-row items-center gap-x-1">
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text className="text-xs text-gray-600">{request.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
      )}
    </ScrollView>
  );
};

export default LecturerDashboard;

