import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';

import {
  Inter_400Regular,
  Inter_700Bold
} from "@expo-google-fonts/inter";
import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium, Roboto_600SemiBold, Roboto_700Bold, Roboto_800ExtraBold, Roboto_900Black
} from "@expo-google-fonts/roboto";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Roboto_400Regular,
    Roboto_500Medium, Roboto_600SemiBold, Roboto_700Bold, Roboto_800ExtraBold, Roboto_900Black, Roboto_300Light , Roboto_100Thin
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <GestureHandlerRootView style={{ flex: 1 }}>

      <React.Fragment>

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name='(screens)' options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </React.Fragment>
    </GestureHandlerRootView>
    // </ThemeProvider>
  );
}
