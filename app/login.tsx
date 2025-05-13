import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from 'react-native-svg';

export default function LoginScreen () {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const handlePress = () => {
        router.push('/')
    }
    return (
        <View>
            <ImageBackground 
                source={require('../assets/images/bg-2.jpg')}
                resizeMode="cover"
            >
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={handlePress}>
                        <View style={[styles.headerContainer, {paddingTop: insets.top || 16}]}>
                            <Svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M0.340492 5.80959L6.92047 0.286317C7.37527 -0.0954389 8.11067 -0.0954389 8.56063 0.286317L9.65407 1.20415C10.1089 1.58591 10.1089 2.20322 9.65407 2.58091L4.99486 6.5L9.65891 10.415C10.1137 10.7968 10.1137 11.4141 9.65891 11.7918L8.56547 12.7137C8.11067 13.0954 7.37527 13.0954 6.92531 12.7137L0.34533 7.19041C-0.114301 6.80865 -0.114301 6.19135 0.340492 5.80959Z" fill="white"/>
                            </Svg>
                            <Text style={styles.textStyleHeader}>Kembali</Text>
                        </View>
                    </TouchableWithoutFeedback> 
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[ styles.titleStyle]}>Selamat Datang Kembali</Text>
                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={styles.textStyle}>No.Regis</Text>
                            <TextInput placeholder="Masukkan no regis ..." style={styles.inputStyle}/>
                        </View>
                        <View>
                            <Text style={styles.textStyle}>Password</Text>
                            <TextInput placeholder="Masukkan password ..." style={styles.inputStyle}/>
                        </View>
                        <View>
                            <TouchableHighlight style={[styles.buttonContainer, {
                                    backgroundColor: Colors['light'].primary,
                                }]}>
                                    <View>
                                        <Text style={styles.buttonText}>Masuk</Text>
                                    </View>
                                </TouchableHighlight>
                                <Text style={{
                                    textAlign: 'center',
                                    marginVertical: 10,
                                    color: Colors['light'].text
                                }}>Atau</Text>
                                <TouchableHighlight style={[styles.buttonContainer, {
                                    borderColor: Colors['light'].primary,
                                    borderStyle: 'solid',
                                    borderWidth: 1
                                }]}>
                                    <View>
                                        <Text style={[styles.buttonText, {
                                            color: Colors['light'].primary
                                        }]}>Daftar</Text>
                                    </View>
                                </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 230,
        backgroundColor: 'transparant',
        paddingVertical: 20,
        paddingHorizontal: 25,
        position: 'relative'
    },
    headerContainer: {
        width: 150,
        display: 'flex',
        alignItems: 'center',
        columnGap: 10,
        flexDirection: 'row',
        cursor: 'pointer',
    },
    textStyleHeader: {
        color: '#fff',
        fontSize: 16
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 30,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingHorizontal: 20
    },
    textStyle: {
        color: Colors['light'].text,
        fontWeight: 'bold',
        fontSize: 15
    },
    titleStyle: {
        width: 260,
        fontSize: 27,
        color: Colors['light'].primary,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputContainer: {
        width: '100%',
        marginTop: 60,
        alignSelf: 'flex-start',
        display: 'flex',
        rowGap: 40
    },
    inputStyle: {
        borderColor: Colors['light'].borderColor,
        borderWidth: 0.5,
        borderStyle: 'solid',
        paddingHorizontal: 15,
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 10
    },
    buttonContainer: {
        paddingVertical: 15,
        borderRadius: 50
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center'
    }
})