import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  // Platform
} from "react-native";
import Meal from "../models/meal";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MealMiniDetails from "./MealMiniDetails";

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    // overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  innerContainer: { borderRadius: 8, overflow: "hidden" },
  image: { width: "100%", height: 200 },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  buttonPressed: { opacity: 0.5 },
});

interface MealItemProps {
  meal: Meal;
}

const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.mealItem}>
      <Pressable
        onPress={() => navigation.navigate("MealDetails", { mealId: meal.id })}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => {
          return [styles.innerContainer, pressed && styles.buttonPressed];
        }}
      >
        <View>
          <Image source={{ uri: meal.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{meal.title}</Text>
        </View>
        <MealMiniDetails
          mealDuration={meal.duration}
          mealComplexity={meal.complexity}
          mealAffordability={meal.affordability}
        />
      </Pressable>
    </View>
  );
};

export default MealItem;
