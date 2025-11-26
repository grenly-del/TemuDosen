import { AuthProvider } from "@/contexts/AuthContext";
import { ContactedProvider } from "@/contexts/ContactedContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import './global.css';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({ // Configure Fonts
    'Roboto-Italic': require('../assets/fonts/Roboto-Italic-VariableFont_wdth,wght.ttf'),
    Roboto: require('../assets/fonts/Roboto-VariableFont_wdth,wght.ttf')
  })
  if( !fontsLoaded ){
    return null
  }
  return (
    <AuthProvider>
      <ContactedProvider>
        <Stack screenOptions={{
          animation: 'slide_from_bottom'
        }}>
           <Stack.Screen name="index" options={{
            headerShown: false
          }}/>
          <Stack.Screen name="home" options={{
            headerShown: false
          }}/>
          <Stack.Screen name="login" options={{
            headerShown: false
          }}/>
           <Stack.Screen name="regis" options={{
            headerShown: false
          }}/>
          <Stack.Screen name="(students)" options={{
            headerShown: false
          }}/>
          <Stack.Screen name="(lecturers)" options={{
            headerShown: false
          }}/>
           <Stack.Screen name="(detail)/[id]" options={{
            headerShown: false
          }}/>
           <Stack.Screen name="(schedule)/[id]" options={{
            headerShown: false
          }}/>
        </Stack>
      </ContactedProvider>
    </AuthProvider>
  )
}
