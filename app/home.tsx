import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function Index() {
  const router = useRouter()
  const inset = useSafeAreaInsets()
  
  // Animasi values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const slideUpAnim2 = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start animations on mount
    Animated.parallel([
      // Fade in main text
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Slide up main text
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      // Slide up subtitle
      Animated.timing(slideUpAnim2, {
        toValue: 0,
        duration: 1000,
        delay: 200,
        useNativeDriver: true,
      }),
      // Scale up icon
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation for icons
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    floatAnimation.start();

    const floatAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 1,
          duration: 2500,
          delay: 500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    );
    floatAnimation2.start();

    // Pulse animation for buttons
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
  }, []);

  const handlePressBtn = (route: string) => {
    // Haptic feedback animation
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      router.push(route);
    }, 150);
  };

  const floatTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const floatTranslateY2 = floatAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <View className="flex-1">
      <ImageBackground 
        source={require('../assets/images/bg-2.jpg')} 
        className="w-full h-full"
        resizeMode="cover"
      >
        {/* Gradient Overlay - Using View with opacity for gradient-like effect */}
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(65,111,223,0.35)',
          }}
        />
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.25)',
          }}
        />

        <View className="w-full flex-col justify-center items-center relative h-full">
          {/* Floating Icons - Background Decoration */}
          <Animated.View
            style={{
              position: 'absolute',
              top: height * 0.15,
              right: width * 0.1,
              transform: [{ translateY: floatTranslateY }],
              opacity: 0.3,
            }}
          >
            <Ionicons name="school-outline" size={60} color="white" />
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              top: height * 0.25,
              left: width * 0.1,
              transform: [{ translateY: floatTranslateY2 }],
              opacity: 0.25,
            }}
          >
            <FontAwesome5 name="chalkboard-teacher" size={50} color="white" />
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              top: height * 0.35,
              right: width * 0.15,
              transform: [{ translateY: floatTranslateY }],
              opacity: 0.2,
            }}
          >
            <Ionicons name="people-outline" size={45} color="white" />
          </Animated.View>

          {/* Main Content */}
          <View className="flex-1 justify-center items-center px-6">
            {/* Icon with scale animation */}
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                marginBottom: 30,
              }}
            >
              <View className="bg-white/20 backdrop-blur-lg rounded-full p-6 border-2 border-white/30">
                <FontAwesome5 name="graduation-cap" size={64} color="white" />
              </View>
            </Animated.View>

            {/* Main Title */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }],
              }}
            >
              <Text className="text-5xl my-auto font-roboto font-bold text-white text-center mb-4">
                Selamat Datang!
              </Text>
            </Animated.View>

            {/* Subtitle */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim2 }],
              }}
            >
              <Text className="text-3xl text-white/90 text-center mb-2 font-semibold">
                Cari Dosen
              </Text>
              <Text className="text-3xl text-white/90 text-center font-semibold">
                Favorite-mu!
              </Text>
            </Animated.View>

            {/* Description */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim2 }],
                marginTop: 20,
              }}
            >
              <Text className="text-base text-white/80 text-center px-8 leading-6">
                Temukan dan hubungi dosen pembimbing dengan mudah
              </Text>
            </Animated.View>

            {/* Feature Icons */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim2 }],
                marginTop: 40,
              }}
              className="flex-row gap-6"
            >
              <View className="items-center">
                <View className="bg-white/20 rounded-full p-3 mb-2">
                  <Ionicons name="search" size={24} color="white" />
                </View>
                <Text className="text-white/80 text-xs text-center">Cari Dosen</Text>
              </View>
              <View className="items-center">
                <View className="bg-white/20 rounded-full p-3 mb-2">
                  <Ionicons name="calendar" size={24} color="white" />
                </View>
                <Text className="text-white/80 text-xs text-center">Atur Jadwal</Text>
              </View>
              <View className="items-center">
                <View className="bg-white/20 rounded-full p-3 mb-2">
                  <Ionicons name="chatbubbles" size={24} color="white" />
                </View>
                <Text className="text-white/80 text-xs text-center">Chat Langsung</Text>
              </View>
            </Animated.View>
          </View>

          {/* Bottom Buttons */}
          <Animated.View
            className="absolute flex flex-row w-full justify-between bottom-0"
            style={{
              marginBottom: inset.bottom,
              transform: [{ scale: pulseAnim }],
            }}
          >
            <TouchableOpacity
              onPress={() => handlePressBtn('/login')}
              activeOpacity={0.8}
              className="py-6 bg-white/10 backdrop-blur-lg px-20 rounded-tr-[36px] border-t border-r border-white/20"
            >
              <View className="flex-row items-center justify-center gap-x-2">
                <Ionicons name="log-in-outline" size={20} color="white" />
                <Text className="text-lg text-white font-semibold">Masuk</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePressBtn('/regis')}
              activeOpacity={0.8}
              className="py-6 bg-white/10 backdrop-blur-lg px-20 rounded-tl-[36px] border-t border-l border-white/20"
            >
              <View className="flex-row items-center justify-center gap-x-2">
                <Ionicons name="person-add-outline" size={20} color="white" />
                <Text className="text-lg text-white font-semibold">Daftar</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}
