import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#c1c1c1',
        tabBarStyle: {
          position: 'absolute',
          bottom: 50,
          left: '50%',
          right: '50%',
          transform: [{ translateX: 20 }],
          alignSelf: 'center',
          borderRadius: 50,
          borderWidth: 2,
          borderTopWidth: 2,
          borderColor: 'black',
          overflow: 'hidden',
          // backgroundColor: 'white',
          height: 60,
          // shadowColor: '#000',
          // shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 0 },
          // shadowRadius: 10,
          elevation: 0, // for Android shadow
          maxWidth: 350,
          paddingTop: 10,
          paddingBottom: 10
        },
        tabBarItemStyle: {
          width: 20,
          paddingTop: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name="lightbulb-o"
              color={focused ? "black" : color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(thought_box)"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name="inbox"
              color={focused ? "black" : color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(feed)"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name="list-ul"
              color={focused ? "black" : color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(settings)"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              size={28}
              name="cog"
              color={focused ? "black" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
