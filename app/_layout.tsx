<<<<<<< HEAD
import { useColorScheme } from 'nativewind';
=======
import { useColorScheme } from '@/hooks/useColorScheme';
>>>>>>> b9f4f69 (fixed loading bug)
import { AuthContext, UserInfoProps } from '@/Store/AuthContext';
import { ThemeContext } from '@/Store/ThemeContext';
import QueryProvider from '@/Store/QueryProvider';
import { isUserLoggedIn } from '@/utils/helpers';
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
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const toggleTheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  const [loading, setloading] = useState(false)
  const [isLoggedIn, setisLoggedIn] = useState(true)

  const [user, setuser] = useState<UserInfoProps | null>(null)
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Roboto_400Regular,
    Roboto_500Medium, Roboto_600SemiBold, Roboto_700Bold, Roboto_800ExtraBold, Roboto_900Black, Roboto_300Light, Roboto_100Thin
  });

  useEffect(() => {
    const validateUser = async () => {
      const userLoggedIn: boolean = await isUserLoggedIn();
      console.log(userLoggedIn);

      if (userLoggedIn) {
        // setuser(JSON.parse(userLoggedIn));
        setisLoggedIn(true);
      } else {
        setisLoggedIn(true);
      }

      setloading(false);
    };

    validateUser();
  }, []);

  if (!loaded || loading) {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
<<<<<<< HEAD
       <Text>Loading</Text>
=======
       <Text> Loading</Text> 
>>>>>>> b9f4f69 (fixed loading bug)
       </View>); // or splash screen
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <ThemeContext.Provider value={{ isDark: colorScheme === 'dark', toggleTheme }}>
    <QueryProvider>

      <AuthContext.Provider value={{ user: user, setuser: setuser, isLoggedIn: isLoggedIn, setisLoggedIn: setisLoggedIn }}>
        <GestureHandlerRootView style={{ flex: 1 }}>

          <React.Fragment>

            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(screens)" />
            </Stack>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </React.Fragment>
        </GestureHandlerRootView>
      </AuthContext.Provider>
    </QueryProvider>
    </ThemeContext.Provider>
    // </ThemeProvider>

  );
}
