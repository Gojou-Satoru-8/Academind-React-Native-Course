import { ListRenderItemInfo } from "react-native";
import Category from "./models/category";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type itemDataType = ListRenderItemInfo<Category>;

// List all your screens at the Root level, with all params expected by each
export type RootStackParamList = {
  MealsCategories: undefined;
  MealsOverview: { categoryId: string };
};

// Navigation prop types for each screen (not mandatory cuz you can use useNavigation() instead)
export type MealsCategoriesNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "MealsCategories"
>;

