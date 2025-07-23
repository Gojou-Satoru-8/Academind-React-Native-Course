import {
  // NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { RootStackParamList } from "../types";
import { useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import MealMiniDetails from "../components/MealMiniDetails";
import Subtitle from "../components/MealDetails/Subtitle";
import List from "../components/MealDetails/List";
import IconButton from "../components/IconButton";
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

const MealDetailsScreen = ({ route, navigation }: MealDetailsProps) => {
  const { mealId } = route.params;
  const meal = MEALS.find((meal) => meal.id === mealId);

  const headerButtonPressHandler = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal?.title,
      headerRight: () => {
        return <IconButton onPress={headerButtonPressHandler} />;
      },
    });
  }, [meal, navigation]);

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
