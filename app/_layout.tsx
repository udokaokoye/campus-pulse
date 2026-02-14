import Loading from '@/components/loading';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext, UserInfoProps } from '@/Store/AuthContext';
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
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loading, setloading] = useState(false)
  const [isLoggedIn, setisLoggedIn] = useState(false)

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
        setisLoggedIn(false);
      }

      setloading(false);
    };

    validateUser();
  }, []);

  if (!loaded || loading) {
    return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
       <Loading /> 
       </View>); // or splash screen
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <QueryProvider>

      <AuthContext.Provider value={{ user: user, setuser: setuser, isLoggedIn: isLoggedIn, setisLoggedIn: setisLoggedIn }}>
        <GestureHandlerRootView style={{ flex: 1 }}>

          <React.Fragment>

            {/* {!isLoggedIn && (<Stack.Screen name='(screens)/(auth)/signup.tsx' options={{ headerShown: false }} />)}

            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name='(screens)' options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack> */}
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(screens)" />
            </Stack>
            <StatusBar style="auto" />
          </React.Fragment>
        </GestureHandlerRootView>
      </AuthContext.Provider>
    </QueryProvider>
    // </ThemeProvider>

  );
}
