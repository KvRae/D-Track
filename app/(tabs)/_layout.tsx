import { Tabs } from "expo-router";
import {FontAwesome} from "@expo/vector-icons";




export default function TabsLayout() {
  return     <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
          name="home"
          options={{
              title: "home",
              tabBarIcon: ({ color, size }: { color: string; size?: number }) => (
                  <FontAwesome name="home" color={color} size={size ?? 24} />
              ),
          }}
      />
      <Tabs.Screen
          name="login"
          options={{
              title: "login",
              tabBarIcon: ({ color, size }: { color: string; size?: number }) => (
                  <FontAwesome name="sign-in" color={color} size={size ?? 24} />
              ),
          }}
      />
  </Tabs>
}
