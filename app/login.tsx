import { Link, useRouter } from "expo-router";
import { TouchableWithoutFeedback as DismissKeyboardTouchable, ImageBackground, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from 'react-native-svg';


export default function LoginScreen () {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const handlePress = () => {
        router.push('/')
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

                        <View className="flex flex-col w-full mt-[60px] gap-y-10">
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View>
                                    <Text className="text-[15px] font-bold text-text">No.Regis</Text>
                                    <TextInput 
                                        placeholder="Masukkan no regis ..." 
                                        className="border border-borderClr mt-2 px-4 py-4 rounded-lg"
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
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <View className="flex flex-col gap-y-3">
                                <Link href={"(tabs)"} className="bg-primary py-4 rounded-xl">
                                    <Text className="text-white text-center">Masuk</Text>
                                </Link>

                                <Text className="text-center text-text">Atau</Text>

                                <Link href={'/regis'}  className="border border-primary py-4 rounded-xl">
                                    <Text className="text-primary text-center">Daftar</Text>
                                </Link >
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </DismissKeyboardTouchable>
    )
}
