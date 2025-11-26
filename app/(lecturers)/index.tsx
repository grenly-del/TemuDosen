import { useAuth } from "@/contexts/AuthContext";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const LecturerDashboard = () => {
  const { user } = useAuth();

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
          Kelola jadwal konsultasi dan permintaan dari mahasiswa
        </Text>
      </View>

      {/* Statistics Cards */}
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

      {/* Quick Actions */}
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

      {/* Recent Requests */}
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
    </ScrollView>
  );
};

export default LecturerDashboard;

