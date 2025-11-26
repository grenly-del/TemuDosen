import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type ScheduleStatus = 'pending' | 'approved' | 'rejected';

interface ScheduleRequest {
  id: string;
  studentName: string;
  studentNim: string;
  date: string;
  time: string;
  topic: string;
  notes?: string;
  status: ScheduleStatus;
}

const ScheduleRequests = () => {
  const [filter, setFilter] = useState<ScheduleStatus | 'all'>('all');

  // Mock data - akan diganti dengan data real dari API
  const requests: ScheduleRequest[] = [
    {
      id: '1',
      studentName: 'John Doe',
      studentNim: '1234567890',
      date: '2024-01-15',
      time: '10:00',
      topic: 'Konsultasi Skripsi',
      notes: 'Membahas bab 1 dan 2',
      status: 'pending',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentNim: '0987654321',
      date: '2024-01-15',
      time: '14:00',
      topic: 'Bimbingan Tugas Akhir',
      notes: 'Review proposal',
      status: 'approved',
    },
    {
      id: '3',
      studentName: 'Bob Johnson',
      studentNim: '1122334455',
      date: '2024-01-16',
      time: '09:00',
      topic: 'Konsultasi Penelitian',
      status: 'pending',
    },
  ];

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  const handleApprove = (id: string) => {
    // TODO: Implement approve logic
    console.log('Approve request:', id);
    alert('Jadwal disetujui!');
  };

  const handleReject = (id: string) => {
    // TODO: Implement reject logic
    console.log('Reject request:', id);
    alert('Jadwal ditolak!');
  };

  const ScheduleCard = ({ request }: { request: ScheduleRequest }) => (
    <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">{request.studentName}</Text>
          <Text className="text-sm text-gray-600 mt-1">NIM: {request.studentNim}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${
          request.status === 'pending' 
            ? 'bg-yellow-100' 
            : request.status === 'approved'
            ? 'bg-green-100'
            : 'bg-red-100'
        }`}>
          <Text className={`text-xs font-semibold ${
            request.status === 'pending' 
              ? 'text-yellow-700' 
              : request.status === 'approved'
              ? 'text-green-700'
              : 'text-red-700'
          }`}>
            {request.status === 'pending' ? 'Menunggu' : request.status === 'approved' ? 'Disetujui' : 'Ditolak'}
          </Text>
        </View>
      </View>

      <View className="bg-gray-50 rounded-lg p-3 mb-3">
        <View className="flex-row items-center gap-x-2 mb-2">
          <Ionicons name="calendar-outline" size={16} color="#416FDF" />
          <Text className="text-sm font-semibold text-gray-700">Tanggal & Waktu</Text>
        </View>
        <Text className="text-base text-gray-900 ml-6">
          {request.date} • {request.time}
        </Text>
      </View>

      <View className="mb-3">
        <Text className="text-sm font-semibold text-gray-700 mb-1">Topik</Text>
        <Text className="text-base text-gray-900">{request.topic}</Text>
      </View>

      {request.notes && (
        <View className="mb-3">
          <Text className="text-sm font-semibold text-gray-700 mb-1">Catatan</Text>
          <Text className="text-base text-gray-600">{request.notes}</Text>
        </View>
      )}

      {request.status === 'pending' && (
        <View className="flex-row gap-3 mt-2">
          <TouchableOpacity
            onPress={() => handleApprove(request.id)}
            className="flex-1 bg-green-500 py-3 rounded-xl"
          >
            <View className="flex-row items-center justify-center gap-x-2">
              <Ionicons name="checkmark-circle" size={18} color="white" />
              <Text className="text-white font-semibold">Setujui</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleReject(request.id)}
            className="flex-1 bg-red-500 py-3 rounded-xl"
          >
            <View className="flex-row items-center justify-center gap-x-2">
              <Ionicons name="close-circle" size={18} color="white" />
              <Text className="text-white font-semibold">Tolak</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Filter Section */}
      <View className="bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <Text className="text-sm font-semibold text-gray-700 mb-3">Filter Status:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 4 }}
        >
          <View className="flex-row gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => setFilter(status)}
                className={`px-4 py-2 rounded-full border-2 ${
                  filter === status
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <Text className={`text-sm font-medium ${
                  filter === status ? 'text-white' : 'text-gray-700'
                }`}>
                  {status === 'all' ? 'Semua' : 
                   status === 'pending' ? 'Menunggu' :
                   status === 'approved' ? 'Disetujui' : 'Ditolak'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Requests List */}
      <ScrollView 
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <ScheduleCard key={request.id} request={request} />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="calendar-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg mt-4 font-semibold">
              Tidak ada permintaan
            </Text>
            <Text className="text-gray-400 text-sm mt-2 text-center px-8">
              {filter === 'all' 
                ? 'Belum ada permintaan jadwal dari mahasiswa'
                : `Tidak ada permintaan dengan status "${filter === 'pending' ? 'Menunggu' : filter === 'approved' ? 'Disetujui' : 'Ditolak'}"`}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ScheduleRequests;

