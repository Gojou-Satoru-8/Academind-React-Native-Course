import { View, Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Meal from "../models/meal";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
// import { RouteProp, useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

type MealsOverviewScreenProps = NativeStackScreenProps<RootStackParamList, "MealsOverview">;

const MealsOverviewScreen = ({ route, navigation }: MealsOverviewScreenProps) => {
  console.log("🚀 ~ route:", route);
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

  const renderMealItem = (itemData: ListRenderItemInfo<Meal>) => {
    return <MealItem meal={itemData.item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mealsForCategory}
        renderItem={renderMealItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MealsOverviewScreen;
