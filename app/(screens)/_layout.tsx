import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ScreensLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="specific-event"
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}