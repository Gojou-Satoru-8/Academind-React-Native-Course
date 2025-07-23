import { FlatList, ListRenderItemInfo, ScrollView, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { useCallback } from "react";
import { DrawerParamList, RootStackParamList } from "../types";
import CategoryGridTile from "../components/CategoryGridTile";
import {
  NativeStackScreenProps,
  // NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Category from "../models/category";
import { DrawerScreenProps } from "@react-navigation/drawer";
// import { useNavigation } from "@react-navigation/native";
// import { NavigationProp, useNavigation } from "@react-navigation/native";

type CategoriesScreenProps = DrawerScreenProps<DrawerParamList, "MealsCategories">;

const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => {
  // Alternative to navigation prop being injected (automatically) into component, useNavigation():
  // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderCategoryItem = useCallback((itemData: ListRenderItemInfo<Category>) => {
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
