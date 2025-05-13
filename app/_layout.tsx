import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';
import { LightTheme } from '@/theme/light';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-VariableFont_wdth,wght.ttf')
  });

  if (loaded) {
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = { fontFamily: 'Roboto' }; // ← Gunakan Roboto di seluruh Text
    }
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={LightTheme}>
      <Stack>
        <Stack.Screen name='login' options={{headerShown: false}}/>
        <Stack.Screen name='regis' options={{headerShown: false}}/>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'dark' : 'light'}/>
    </ThemeProvider>
  );
}
