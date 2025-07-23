// import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import { DrawerParamList, RootStackParamList } from "./types";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavouritesScreen from "./screens/FavouritesScreen";
import { Ionicons } from "@expo/vector-icons";
// import { CATEGORIES } from "./data/dummy-data";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        title: "Meals App Drawer", // applies if no title is explicitly set in Stack.Screen
        headerStyle: { backgroundColor: "#8B2EFF" },
        headerTintColor: "white", // Applies to header text and back button
        sceneStyle: styles.screen,
        drawerStyle: { backgroundColor: "#1A1B1D" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#1A1B1D",
        drawerActiveBackgroundColor: "#27FEBE",
      }}
    >
      <Drawer.Screen
        name="MealsCategories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerLabel: "All Categories",
          drawerIcon: ({ size, color, focused }) => {
            console.log(
              "🚀 ~ MealsCategories Icon ~ size | color | focussed:",
              size,
              color,
              focused
            );
            return <Ionicons name="list" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          title: "Favourites",
          drawerLabel: "Favourites",
          drawerIcon: ({ size, color, focused }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    // <SafeAreaView style={styles.screen}>
    // NOTE: SafeAreaView not needed when using React Navigation
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          // By default the first screen in the Stack is the default screen, but can be changed via:
          // initialRouteName="MealsCategories"
          // NOTE: Following options apply to all screens, but can be overridden by specifying options inside each Stack.Screen:
          screenOptions={{
            title: "Meals App", // applies if no title is explicitly set in Stack.Screen
            headerStyle: { backgroundColor: "#8B2EFF" },
            headerTintColor: "white", // Applies to header text and back button
            contentStyle: styles.screen,
          }}
        >
          <Stack.Screen
            // name="MealsCategories"
            // component={CategoriesScreen}
            // NOTE: component prop accepts other navigators for nested navigation:
            name="MainScreenDrawer"
            component={DrawerNavigator}
            // NOTE: Following options are for per-screen customization (overrides screenOptions):
            options={{
              // title: "All Categories",
              // headerStyle: { backgroundColor: "#8B2EFF" },
              // headerTintColor: "white",
              // contentStyle: styles.screen,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverviewScreen}
            // NOTE: Dynamically setting screen's title (can be otherwise set and overriden by navigation.setOption inside the screen component ie MealsOverviewScreen)
            // options={({ route }) => {
            //   // this function gets passed route and navigation as props, just like other screen components
            //   const { categoryId } = route.params;
            //   const category = CATEGORIES.find((category) => (category.id = categoryId));
            //   return { title: category?.title, contentStyle: { backgroundColor: "blue" } };
            // }}
          />
          <Stack.Screen
            name="MealDetails"
            component={MealDetailsScreen}
            // options={{ headerRight: ({}) => <Text>Super</Text> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#24180f",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
