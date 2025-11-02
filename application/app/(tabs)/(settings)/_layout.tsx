import { Stack } from "expo-router";

export default function ThoughtBoxLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0b2545',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          // fontWeight: 'bold'
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="plans" options={{ headerShown: false }} />
      <Stack.Screen name="communications" options={{ headerShown: false }} />
      <Stack.Screen name="preferences" options={{ headerShown: false }} />
    </Stack>
  );
}