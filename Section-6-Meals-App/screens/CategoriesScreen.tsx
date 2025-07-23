import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { useCallback } from "react";
import { DrawerParamList, RootStackParamList } from "../types";
import CategoryGridTile from "../components/CategoryGridTile";
import {
  NativeStackScreenProps,
  // NativeStackNavigationProp
} from "@react-navigation/native-stack";
import {
  DrawerScreenProps,
  // DrawerNavigationProp
} from "@react-navigation/drawer";
import {
  CompositeScreenProps,
  //  CompositeNavigationProp
} from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";
import Category from "../models/category";

const styles = StyleSheet.create({
  screen: { marginVertical: 24 },
});

// NOTE: This screen is part of the Drawer Navigation, which is itself part of the Stack Navigation.
// Thus, the type will be CompositeScreenProps<A, B>, where A is the immediate Navigator (Drawer i.e.
// DrawerScreenProps), and B is the overall navigator (Stack i.e. StackScreenProps). Here, swapping
// the order of navigators works, but isn't technically right.
type CategoriesScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, "MealsCategories">,
  NativeStackScreenProps<RootStackParamList, "MainScreenDrawer">
>;

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ navigation }) => {
  // Alternative to navigation prop being injected (automatically) into component, useNavigation():
  // NOTE: Similar to above CompositeScreenProps, here we use CompositeNavgationProp:
  // const navigation =
  //   useNavigation<
  //     CompositeNavigationProp<
  //       DrawerNavigationProp<DrawerParamList>,
  //       NativeStackNavigationProp<RootStackParamList>
  //     >
  //   >();
  // navigation.navigate("Favourites"); // Now navigate() has all routes available.
  // NOTE: There is no CompositeRouteProp, unlike CompositeScreenProps and CompositeNavigationProp,
  // this is becuase route prop just gives you the current route, and has no use of the routes from
  // other navigators.
  const renderCategoryItem = useCallback(
    (itemData: ListRenderItemInfo<Category>) => {
      return (
        <CategoryGridTile
          category={itemData.item}
          onPress={() => navigation.navigate("MealsOverview", { categoryId: itemData.item.id })}
        />
      );
    },
    [navigation]
  );

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      style={styles.screen}
    />
    // <ScrollView>
    //   {CATEGORIES.map((category: Category) => (
    //     <CategoryGridTile category={category} />
    //   ))}
    // </ScrollView>
  );
};
export default CategoriesScreen;
