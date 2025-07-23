import { CATEGORIES, MEALS } from "../data/dummy-data";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";
// import { RouteProp, useRoute } from "@react-navigation/native";

type MealsOverviewScreenProps = NativeStackScreenProps<RootStackParamList, "MealsOverview">;

const MealsOverviewScreen: React.FC<MealsOverviewScreenProps> = ({ route, navigation }) => {
  // console.log("🚀 ~ route:", route);
  // NOTE: Alternative to route prop being injected (automatically) into component, useRoute():
  //   const route = useRoute<RouteProp<RootStackParamList>>();

  const { categoryId } = route.params;
  const category = CATEGORIES.find((category) => category.id === categoryId);
  const mealsForCategory = MEALS.filter((meal) => meal.categoryIds.includes(categoryId));

  useLayoutEffect(() => {
    // NOTE: This overrides the options set in Stack.Screen (be it direct object being passed or the
    // functional form). This can be used to keep the Stack.Screen cleaner.
    // Also, useEffect isn't ideal as it runs after the component loads, therefore the older fallback
    // title is visible for a split second. useLayoutEffect runs before the component renders
    navigation.setOptions({ title: category?.title });
  }, [category, navigation]);

  return <MealsList items={mealsForCategory} />;
};

export default MealsOverviewScreen;
