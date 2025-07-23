import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";
import { Ionicons } from "@expo/vector-icons/";
import { RootParamList } from "./types";

// const Drawer = createDrawerNavigator<RootParamList>();
const BottomTab = createBottomTabNavigator<RootParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/* DRAWER NAVIGATOR */}
      {/* <Drawer.Navigator
        screenOptions={{
          title: "Navigators",
          headerStyle: { backgroundColor: "teal" },
          headerTintColor: "white",
          drawerStyle: { backgroundColor: "#eee", padding: 6 },
          drawerActiveTintColor: "#3c0a6b",
          drawerActiveBackgroundColor: "#f0e1ff",
        }}
      >
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            title: "Welcome", // This affects the title in the header (top)
            drawerLabel: "Welcome", // This goes in the sidebar
            drawerIcon: ({ focused, color, size }) => {
              // console.log("🚀 ~ App ~ size | color | focussed:", size, color, focused);
              return <Ionicons name="home" size={size} color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            title: "User",
            drawerIcon: ({ color, size, focused }) => {
              return <Ionicons name="person" color={color} size={size} />;
            },
          }}
        />
      </Drawer.Navigator> */}

      <BottomTab.Navigator
        screenOptions={{
          title: "Navigators",
          headerStyle: { backgroundColor: "teal" },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: "#eee", padding: 6 },
          tabBarActiveTintColor: "#3c0a6b",
          tabBarActiveBackgroundColor: "#f0e1ff",
        }}
      >
        <BottomTab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            title: "Welcome", // This affects the title in the header (top)
            tabBarLabel: "Welcome", // This goes in the sidebar
            tabBarIcon: ({ focused, color, size }) => {
              // console.log("🚀 ~ App ~ size | color | focussed:", size, color, focused);
              return <Ionicons name="home" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="User"
          component={UserScreen}
          options={{
            title: "User",
            tabBarIcon: ({ color, size, focused }) => {
              return <Ionicons name="person" color={color} size={size} />;
            },
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
