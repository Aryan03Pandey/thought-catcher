import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function AuthLayout() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      setAuthenticated(!!token);
    })();
  }, []);

  if (authenticated === null) return null; // still loading

  if (authenticated) {
    return <Redirect href="/(tabs)/(home)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}