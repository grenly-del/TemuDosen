import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, TouchableWithoutFeedback as DismissKeyboardTouchable, ImageBackground, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from 'react-native-svg';
import { UserRole } from "@/types/user";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function LoginScreen () {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const { login } = useAuth()
    const [noRegis, setNoRegis] = useState('')
    const [password, setPassword] = useState('')
    const [selectedRole, setSelectedRole] = useState<UserRole>('student')
    const [isLoading, setIsLoading] = useState(false)

    const handlePress = () => {
        router.push('/')
    }

    const handleLogin = async () => {
        if (!noRegis.trim() || !password.trim()) {
            alert('Mohon lengkapi semua field')
            return
        }

        try {
            setIsLoading(true)
            await login(noRegis, password, selectedRole)
            
            // Navigate based on role
            if (selectedRole === 'lecturer') {
                router.replace('/(lecturers)')
            } else {
                router.replace('/(students)')
            }
        } catch (error) {
            console.error('Login error:', error)
            alert('Terjadi kesalahan saat login')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DismissKeyboardTouchable onPress={Keyboard.dismiss}>
            <View className="flex-1">
                <ImageBackground 
                    source={require('../assets/images/bg-2.jpg')}
                    resizeMode="cover"
                    className="flex-1"
                >
                    <View className="w-full h-[230px] px-6" style={{ paddingTop: insets.top + 16 }}>
                        <TouchableWithoutFeedback onPress={handlePress}>
                            <View className="flex-row items-center gap-x-4">
                                <Svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M0.340492 5.80959L6.92047 0.286317C7.37527 -0.0954389 8.11067 -0.0954389 8.56063 0.286317L9.65407 1.20415C10.1089 1.58591 10.1089 2.20322 9.65407 2.58091L4.99486 6.5L9.65891 10.415C10.1137 10.7968 10.1137 11.4141 9.65891 11.7918L8.56547 12.7137C8.11067 13.0954 7.37527 13.0954 6.92531 12.7137L0.34533 7.19041C-0.114301 6.80865 -0.114301 6.19135 0.340492 5.80959Z" fill="white"/>
                                </Svg>
                                <Text className="text-white text-lg">Kembali</Text>
                            </View>
                        </TouchableWithoutFeedback> 
                    </View>

                    <KeyboardAvoidingView
                        behavior={'height'}
                        className="w-full bg-white rounded-t-3xl px-5 pt-8 pb-12 flex-1 items-center"
                    >
                        <Text className="text-[27px] font-bold text-center text-primary w-[260px]">Selamat Datang Kembali</Text>

                        <View className="flex flex-col w-full mt-[40px] gap-y-6">
                            {/* Role Selection */}
                            <View>
                                <Text className="text-[15px] font-bold text-text mb-3">Masuk Sebagai</Text>
                                <View className="flex-row gap-3">
                                    <TouchableOpacity
                                        onPress={() => setSelectedRole('student')}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                                            selectedRole === 'student' 
                                                ? 'bg-blue-50 border-blue-500' 
                                                : 'bg-gray-50 border-gray-200'
                                        }`}
                                    >
                                        <View className="flex-row items-center justify-center gap-x-2">
                                            <FontAwesome5 
                                                name="user-graduate" 
                                                size={16} 
                                                color={selectedRole === 'student' ? '#416FDF' : '#6B7280'} 
                                            />
                                            <Text className={`font-semibold ${
                                                selectedRole === 'student' ? 'text-blue-600' : 'text-gray-600'
                                            }`}>
                                                Mahasiswa
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setSelectedRole('lecturer')}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                                            selectedRole === 'lecturer' 
                                                ? 'bg-blue-50 border-blue-500' 
                                                : 'bg-gray-50 border-gray-200'
                                        }`}
                                    >
                                        <View className="flex-row items-center justify-center gap-x-2">
                                            <FontAwesome5 
                                                name="chalkboard-teacher" 
                                                size={16} 
                                                color={selectedRole === 'lecturer' ? '#416FDF' : '#6B7280'} 
                                            />
                                            <Text className={`font-semibold ${
                                                selectedRole === 'lecturer' ? 'text-blue-600' : 'text-gray-600'
                                            }`}>
                                                Dosen
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View>
                                    <Text className="text-[15px] font-bold text-text">
                                        {selectedRole === 'lecturer' ? 'NIDN' : 'NIM'}
                                    </Text>
                                    <TextInput 
                                        placeholder={selectedRole === 'lecturer' ? 'Masukkan NIDN ...' : 'Masukkan NIM ...'} 
                                        className="border border-borderClr mt-2 px-4 py-4 rounded-lg"
                                        value={noRegis}
                                        onChangeText={setNoRegis}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View>
                                    <Text className="text-[15px] font-bold text-text">Password</Text>
                                    <TextInput 
                                        placeholder="Masukkan password ..." 
                                        className="border border-borderClr mt-2 px-4 py-4 rounded-lg"
                                        secureTextEntry
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <View className="flex flex-col gap-y-3">
                                <TouchableOpacity 
                                    onPress={handleLogin}
                                    disabled={isLoading}
                                    className={`py-4 rounded-xl ${isLoading ? 'bg-gray-400' : 'bg-primary'}`}
                                >
                                    <Text className="text-white text-center font-semibold">
                                        {isLoading ? 'Masuk...' : 'Masuk'}
                                    </Text>
                                </TouchableOpacity>

                                <Text className="text-center text-text">Atau</Text>

                                <TouchableOpacity 
                                    onPress={() => router.push('/regis')}
                                    className="border border-primary py-4 rounded-xl"
                                >
                                    <Text className="text-primary text-center">Daftar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </DismissKeyboardTouchable>
    )
}
