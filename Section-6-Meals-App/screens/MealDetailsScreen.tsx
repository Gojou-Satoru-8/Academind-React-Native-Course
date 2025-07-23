import {
  // NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { RootStackParamList } from "../types";
import { useContext, useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import MealMiniDetails from "../components/MealDetails/MealMiniDetails";
import Subtitle from "../components/MealDetails/Subtitle";
import List from "../components/MealDetails/List";
import IconButton from "../components/IconButton";
import { FavouritesContext } from "../store/context";
// import { RouteProp } from "@react-navigation/native";

const styles = StyleSheet.create({
  screen: { flex: 1 },
  // rootContainer: { marginBottom: 32 },
  image: { width: "100%", height: 350 },

  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  listContainer: { width: "80%", margin: "auto", marginBottom: 32 },
});

// interface MealDetailsProps {
//   navigate: NativeStackNavigationProp<RootStackParamList, "MealDetails">;
//   route: RouteProp<RootStackParamList>;
// }
// OR:

type MealDetailsProps = NativeStackScreenProps<RootStackParamList, "MealDetails">;

const MealDetailsScreen: React.FC<MealDetailsProps> = ({ route, navigation }) => {
  const { mealId } = route.params;
  const meal = MEALS.find((meal) => meal.id === mealId);

  const { ids, addFavourite, removeFavourite } = useContext(FavouritesContext);
  console.log("🚀 ~ MealDetailsScreen ~ ids:", ids);
  const mealIsFavourited = ids.includes(mealId);
  console.log("🚀 ~ MealDetailsScreen ~ mealIsFavourited:", mealIsFavourited);

  // const toggleFavouriteMeal = useCallback(() => {
  //   if (mealIsFavourited) removeFavourite(mealId);
  //   else addFavourite(mealId);
  // }, [mealId, mealIsFavourited, addFavourite, removeFavourite]);

  useLayoutEffect(() => {
    const toggleFavouriteMeal = () => {
      if (mealIsFavourited) removeFavourite(mealId);
      else addFavourite(mealId);
    };

    navigation.setOptions({
      title: meal?.title,
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavourited ? "star" : "star-outline"}
            onPress={toggleFavouriteMeal}
          />
        );
      },
    });
  }, [mealId, meal, mealIsFavourited, removeFavourite, addFavourite, navigation]);

  // Likely won't be triggered:
  if (!meal)
    return (
      <View>
        <Text>No meal to display</Text>
      </View>
    );

  return (
    <View style={styles.screen}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{meal.title}</Text>

      <MealMiniDetails
        mealDuration={meal.duration}
        mealComplexity={meal.complexity}
        mealAffordability={meal.affordability}
      />

      <ScrollView style={styles.listContainer}>
        {/* MEAL INGREDIENTS */}
        <Subtitle>Ingredients</Subtitle>
        <List data={meal.ingredients} />
        {/* MEAL STEPS */}
        <Subtitle>Steps</Subtitle>
        <List data={meal.steps} />
      </ScrollView>
    </View>
  );
};

export default MealDetailsScreen;
