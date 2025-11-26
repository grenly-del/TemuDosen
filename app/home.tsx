import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const [active, setActive] = useState('')
  const router = useRouter()
  const inset = useSafeAreaInsets()

  const handlePressBtn = (name:string) => {
      setActive(name)
  }

  useEffect(() => {
    setActive('')
  }, [])

  return (
    <View
    >
      <ImageBackground source={require('../assets/images/bg-2.jpg')} className="w-full h-full">
          <View className="w-full flex-col justify-center items-start relative h-full">
            <View className="px-5 -mt-36">
              <Text className="text-5xl my-auto font-roboto font-bold text-white">Selamat Datang!</Text>
              <Text className="text-4xl text-white">Cari Dosen Favorite-mu!</Text>
            </View>
            <View className="absolute flex flex-row w-full justify-between bottom-0" style={{
              marginBottom: inset.bottom
            }}>
              <TouchableOpacity 
                onPress={() => {
                  handlePressBtn('masuk');
                  router.push('/login');
                }}
                className={`py-6 ${active === 'masuk' ? 'bg-white' : 'bg-transparent'} px-20 rounded-tr-[36px]`}
              >
                <View className="">
                  <Text className={`text-lg ${active === 'masuk' ? 'text-primary': 'text-white'} font-semibold`}>Masuk</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  handlePressBtn('daftar');
                  router.push('/regis');
                }}
                className={`py-6 ${active === 'daftar' ? 'bg-white' : 'bg-transparent'} px-20 rounded-tl-[36px]`}
              >
                <View>
                  <Text className={`${active === 'daftar' ? 'text-primary': 'text-white'} text-lg`}>Daftar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
      </ImageBackground>
    </View>
  );
}
