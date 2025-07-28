import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CompositeNavigationType, MainScreensTabParamList, RootStackParamList } from "./types";
import ManageExpense from "./screens/ManageExpense";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./components/ui/IconButton";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<MainScreensTabParamList>();

const ExpensesOverviewTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route, navigation }) => {
        const nav = navigation as CompositeNavigationType;
        return {
          title: "Expenses Overview", // Fallback / common title
          headerTintColor: "white",
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerRight: (props) => (
            <IconButton
              icon="add"
              size={24}
              color={props.tintColor}
              onPress={() => nav.navigate("ManageExpenseScreen")}
            />
          ),
        };
      }}
    >
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
            // title: "Main Stack Navigator",
          }}
        >
          <Stack.Screen
            name="ExpensesOverviewTabs"
            component={ExpensesOverviewTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageExpenseScreen"
            component={ManageExpense}
            options={{ title: "Add Expense", presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
