import { StyleSheet, View, Text } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import MealsList from "../components/MealsList/MealsList";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList, RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext } from "react";
import { FavouritesContext } from "../store/context";
import { MEALS } from "../data/dummy-data";

const styles = StyleSheet.create({
  rootContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold", color: "white" },
});

type FavouritesScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList>,
  NativeStackScreenProps<RootStackParamList>
>;

const FavouritesScreen: React.FC<FavouritesScreenProps> = () => {
  const { ids } = useContext(FavouritesContext);
  const favouritedMeals = MEALS.filter((meal) => ids.includes(meal.id));
  return favouritedMeals.length === 0 ? (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>You have no favourite meals yet</Text>
    </View>
  ) : (
    <MealsList items={favouritedMeals} />
  );
};

export default FavouritesScreen;
