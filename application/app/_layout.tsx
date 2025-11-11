import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/components/Hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [ready, setReady] = useState(false);

  // ✅ Call all hooks unconditionally (including colorScheme)
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (fontsLoaded && !fontError) {
      SplashScreen.hideAsync();
      setReady(true);
    }
  }, [fontsLoaded, fontError]);

  if (!ready) {
    return null; // safe now — all hooks have already been called
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(sign-in)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
