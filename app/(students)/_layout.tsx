import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const HeaderPopup = () => {
  const [visible, setVisible] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const closePopup = () => {
    if (isMounted.current) {
      setVisible(false);
    }
  };

  return (
    <View>
      {/* Hamburger / Ellipsis Button */}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={{
          marginRight: 16,
          width: 28,
          height: 28,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 14
        }}>
          <FontAwesome6 name="ellipsis-vertical" size={24} color="black" />
        </View>
      </TouchableOpacity>

      {/* Modal Popup */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={closePopup}
      >
        <TouchableWithoutFeedback onPress={closePopup}>
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}>
            <TouchableWithoutFeedback>
              <View style={{
                position: 'absolute',
                right: 20,
                top: 60,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8,
                elevation: 3,
              }}>
                <TouchableOpacity onPress={() => {
                  closePopup();
                  // aksi logout bisa ditaruh di sini
                  console.log('Logout pressed');
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <FontAwesome5 name="sign-out-alt" size={20} color="red" />
                    <Text style={{ color: 'black' }}>Keluar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const _layout = () => {
  return (
    <SafeAreaProvider>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#416FDF',
        tabBarInactiveTintColor: '#878787',
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: '#416FDF'
        },
        headerRight: () => <HeaderPopup />,
      }}>
        <Tabs.Screen name="index" options={{
          title: 'Home',
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }} />
        <Tabs.Screen name="profile" options={{
          title: 'Profil',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }} />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default _layout;
