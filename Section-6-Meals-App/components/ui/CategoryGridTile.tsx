import { Text, Pressable, View, StyleSheet, Platform, GestureResponderEvent } from "react-native";
import Category from "../../models/category";

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    // borderWidth: 2,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    // NOTE: Shadow won't be visible until background color is added:
    backgroundColor: "white",
    ...Platform.select({ android: { overflow: "hidden" } }),
    // NOTE: overflow: "hidden" on ios hides the shadows as they are in the overflow region
  },
  button: { flex: 1 },
  buttonPressed: { opacity: 0.5 },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

interface CategoryGridTitleProps {
  category: Category;
  onPress: (event: GestureResponderEvent) => void;
}
const CategoryGridTile = ({ category, onPress }: CategoryGridTitleProps) => {
  return (
    <View style={[styles.gridItem]}>
      <Pressable
        onPress={onPress}
        // {...(Platform.OS === "android" && { android_ripple: { color: "#ccc" } })}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => {
          return [styles.button, pressed && styles.buttonPressed];
        }}
      >
        <View style={[styles.innerContainer, { backgroundColor: category.color }]}>
          <Text style={styles.title}>{category.title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryGridTile;
