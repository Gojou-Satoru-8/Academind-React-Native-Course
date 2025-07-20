import { FlatList, ScrollView, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { useCallback } from "react";
import { itemDataType, RootStackParamList } from "../types";
import CategoryGridTile from "../components/ui/CategoryGridTile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { NavigationProp, useNavigation } from "@react-navigation/native";

type CategoriesScreenProps = NativeStackScreenProps<RootStackParamList, "MealsCategories">;

const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => {
  // Alternative to navigation prop being injected (automatically) into component, useNavigation():
  //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const renderCategoryItem = useCallback((itemData: itemDataType) => {
    return (
      <CategoryGridTile
        category={itemData.item}
        onPress={() => navigation.navigate("MealsOverview", { categoryId: itemData.item.id })}
      />
    );
  }, []);

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
    // <ScrollView>
    //   {CATEGORIES.map((category: Category) => (
    //     <CategoryGridTile category={category} />
    //   ))}
    // </ScrollView>
  );
};
export default CategoriesScreen;
