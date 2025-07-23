import { StyleSheet, View, Text } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import MealsList from "../components/MealsList/MealsList";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList, RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { useContext } from "react";
// import { FavouritesContext } from "../store/context";
// import { useSelector } from "react-redux";
import {
  //  RootState,
  useAppSelector,
} from "../store/redux";
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
  // const { ids: favouriteMealIds } = useContext(FavouritesContext);
  // const { ids: favrouriteMealIds } = useSelector((state: RootState) => state.favourites);
  // Following is better, as no need to import and assign the RootState to store everytime.
  const { ids: favrouriteMealIds } = useAppSelector((state) => state.favourites);

  // const favouritedMeals = MEALS.filter((meal) => favouriteMealIds.includes(meal.id));
  // NOTE: Above changes the order of the favourite ids.
  const favouritedMeals = favrouriteMealIds.map(
    (mealId) => MEALS.find((meal) => meal.id === mealId)!
  );

  return favouritedMeals.length === 0 ? (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>You have no favourite meals yet</Text>
    </View>
  ) : (
    <MealsList items={favouritedMeals} />
  );
};

export default FavouritesScreen;
