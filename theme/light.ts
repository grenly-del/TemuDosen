// theme/light.ts
import { Colors } from '@/constants/Colors';
import { DefaultTheme } from '@react-navigation/native';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FDFDFD',     // putih
    card: '#fff',            // abu terang (misalnya untuk header)
    text: Colors['light'].text,            // hitam
    border: '#e0e0e0',
    notification: '#ff453a',
    primary: Colors['light'].primary,        // biru (atau warna utama kamu)
  },
  fontFamily: 'Inter'
};
