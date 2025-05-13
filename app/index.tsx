
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    console.log(insets)
  }, [insets])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../assets/images/bg-2.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Selamat Datang!</Text>
          <Text style={styles.subtitle}>Cari Dosen Favorite-Mu!</Text>
        </View>

        <View style={[styles.buttonContainer, { paddingBottom: insets.bottom }]}>
          <Pressable
            onPress={() => router.push('/login')}
            style={({ pressed }) => [
              styles.buttonStyle,
              styles.leftButton,
              pressed ? styles.activeButton : styles.defaultButton,
            ]}
          >
            {({ pressed }) => (
              <Text style={[styles.textStyle, pressed && styles.textActive]}>Masuk</Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => router.push('/regis')}
            style={({ pressed }) => [
              styles.buttonStyle,
              styles.rightButton,
              pressed ? styles.activeButton : styles.defaultButton,
            ]}
          >
            {({ pressed }) => (
              <Text style={[styles.textStyle, pressed && styles.textActive]}>Daftar</Text>
            )}
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: 150,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 32,
    color: 'white',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonStyle: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    borderTopRightRadius: 30,
  },
  rightButton: {
    borderTopLeftRadius: 30,
  },
  defaultButton: {
    backgroundColor: 'transparant',
  },
  activeButton: {
    backgroundColor: '#fff', // Warna aktif saat ditekan
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '600', // Gunakan angka, bukan 'semibold'
    color: '#fff',
  },
  textActive: {
    color: '#1E3A8A',
  },
});



