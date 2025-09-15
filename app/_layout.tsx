import { kColors } from "@/app-example/constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: kColors.grey900 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: kColors.grey900,
          },
          tabBarActiveTintColor: kColors.green,
          tabBarActiveBackgroundColor: "white",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Overview",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color}></Ionicons>
            ),
          }}
        />
        <Tabs.Screen
          name="Transactions"
          options={{
            title: "transactions",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="exchange" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Budgets"
          options={{
            title: "budgets",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="pie-chart" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Pots"
          options={{
            title: "pots",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="savings" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="RecurringBills"
          options={{
            title: "recurring bills",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="money" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
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
