import { View, Text, StyleSheet } from "react-native";
import { MEALS } from "../data/dummy-data";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RouteProp, useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export type MealsOverviewScreenProps = NativeStackScreenProps<RootStackParamList, "MealsOverview">;

const MealsOverviewScreen = ({ route }: MealsOverviewScreenProps) => {
  console.log("🚀 ~ route:", route);
  // NOTE: Alternative to route prop being injected (automatically) into component, useRoute():
  //   const route = useRoute<RouteProp<RootStackParamList>>();

  const { categoryId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Meals Overview Screen</Text>
    </View>
  );
};

export default MealsOverviewScreen;
