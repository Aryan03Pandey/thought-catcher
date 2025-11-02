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
    </Stack>
  );
}
