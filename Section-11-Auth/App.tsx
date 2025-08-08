import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { useAuthContext } from "./store/context";
import IconButton from "./components/ui/IconButton";
import useAuthCheck from "./hooks/useAuthCheck";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.primary500 },
      headerTintColor: "white",
      contentStyle: { backgroundColor: Colors.primary100 },
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
  </Stack.Navigator>
);

const AuthenticatedStack = () => {
  const { logout } = useAuthContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: (props) => {
            return <IconButton icon="exit" color={props.tintColor} size={24} onPress={logout} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { isAppReady, isAuthenticated, panResponder } = useAuthCheck();

  if (!isAppReady) return null;
  // Spread the panResponder's panHandlers into the NavigationContainer
  return (
    <NavigationContainer {...panResponder.panHandlers}>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <Navigation />
    </AuthContextProvider>
  );
}
