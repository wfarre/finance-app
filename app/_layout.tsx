import { kColors } from "@/app-example/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: kColors.grey900,
        },
        tabBarActiveTintColor: kColors.green,
        tabBarActiveBackgroundColor: "white",
      }}
    >
      <Tabs.Screen
        name="Overview"
        options={{
          title: "Overview",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color}></Ionicons>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  activeTabButton: {
    borderBottomWidth: 4,
    borderBottomColor: kColors.green,
  },
});
