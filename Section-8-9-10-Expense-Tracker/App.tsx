import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CompositeNavigationType,
  ExpensesOverviewTabsParamList,
  RootStackParamList,
} from "./types";
import ManageExpense from "./screens/ManageExpense";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./components/ui/IconButton";
import ExpensesContextProvider from "./store/context";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<ExpensesOverviewTabsParamList>();

const ExpensesOverviewTabNavigator = () => {
  return (
    <BottomTab.Navigator
      // id={"ExpensesOverviewTabNavigator"}
      initialRouteName="RecentExpenses" // This sets the initial active tab, the position of the bottom tabs is determined by the position of the BottomTab.Screen components
      screenOptions={({ route, navigation, theme }) => {
        const nav = navigation as CompositeNavigationType;
        return {
          title: "Expenses Overview", // Fallback / common title
          headerTintColor: "white",
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          sceneStyle: { backgroundColor: GlobalStyles.colors.primary700 },
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
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
              // title: "Main Stack Navigator",
            }}
          >
            <Stack.Screen
              name="ExpensesOverviewTabsNavigator"
              component={ExpensesOverviewTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpenseScreen"
              component={ManageExpense}
              options={{
                presentation: "modal",
                contentStyle: { backgroundColor: GlobalStyles.colors.primary800 },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
