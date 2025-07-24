import { FlatList, View, StyleSheet, ListRenderItemInfo } from "react-native";
import Meal from "../../models/meal";
import MealItem from "./MealItem";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

interface MealsListProps {
  items: Meal[];
}
const MealsList: React.FC<MealsListProps> = ({ items }) => {
  const renderMealItem = (itemData: ListRenderItemInfo<Meal>) => {
    return <MealItem meal={itemData.item} />;
  };
  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderMealItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

export default MealsList;
