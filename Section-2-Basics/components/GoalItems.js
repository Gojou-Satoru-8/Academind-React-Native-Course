import { ScrollView, FlatList, StyleSheet, Text, Pressable, View } from "react-native";

const GoalItem = ({ setCourseGoals, itemData }) => {
  const deleteGoal = (goalId) => {
    setCourseGoals((current) => {
      return current.filter((goalItem) => goalItem.id !== goalId);
    });
  };

  //   const deleteGoalByIndex = (index) => {
  //     setCourseGoals((current) => {
  //       const newGoals = [...current];
  //       newGoals.splice(index, 1);
  //       return newGoals;
  //     });
  //   };

  return (
    <View style={styles.goalItem}>
      <Pressable
        onPress={() => deleteGoal(itemData.item.id)}
        android_ripple={{ color: "#40079cff" }}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalItemText}>{itemData.item.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#530acc",
  },
  goalItemText: {
    color: "white",
    fontSize: 16,
  },
  pressedItem: {
    opacity: 0.5,
  },
});

export default GoalItem;
