import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../types";

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 8,
  },
  detailText: { fontSize: 12 },
});

interface MealDetailsProps {
  mealDuration: number;
  mealComplexity: string;
  mealAffordability: string;
}
const MealMiniDetails: React.FC<MealDetailsProps> = ({
  mealDuration,
  mealAffordability,
  mealComplexity,
}) => {
  const route = useRoute<RouteProp<RootStackParamList>>();
  console.log("🚀 ~ route:", route);
  const textStyle = [styles.detailText, route.name === "MealDetails" && { color: "white" }];

  return (
    <View style={styles.details}>
      <Text style={textStyle}>{mealDuration}</Text>
      <Text style={textStyle}>{mealComplexity.toUpperCase()}</Text>
      <Text style={textStyle}>{mealAffordability.toUpperCase()}</Text>
    </View>
  );
};

export default MealMiniDetails;
