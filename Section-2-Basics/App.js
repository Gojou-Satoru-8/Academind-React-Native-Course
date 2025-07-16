// import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Button, Text, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItems";
export default function App() {
  // console.log("Styles: ", styles);

  const [courseGoals, setCourseGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(courseGoals);

  const closeModal = () => setIsModalVisible(false);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        {/* {isModalVisible && <GoalInput setCourseGoals={setCourseGoals} />} */}
        <GoalInput
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          setCourseGoals={setCourseGoals}
        />

        <View style={styles.goalsContainer}>
          <Text style={styles.goalsHeading}>Your Goals</Text>
          {/* <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map((goal, index) => (
            <Text key={index} style={styles.goalItem}>
              {goal.text}
            </Text>
          ))}
        </ScrollView>
        NOTE: Use FlastList as it is more optimized (sort of performs lazy loading) */}
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            renderItem={(itemData) => {
              // NOTE: The itemData wraps each goal into an object, with item property being the goal (value set by us), and other properties such as index and separators
              return <GoalItem setCourseGoals={setCourseGoals} itemData={itemData} />;
            }}
            keyExtractor={(item, index) => {
              // console.log("🚀 ~ KeyExtractor Flatlist ~ item:", item);
              return item.id;
            }}
          />
        </View>
        <Button title="Add Goal" color={"#a065ec"} onPress={() => setIsModalVisible(true)} />
      </View>
      {/* <StatusBar style="light" />
      Can add the statusbar here too */}
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingVertical: 60,
    // paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#1e085a",
  },

  goalsContainer: {
    flex: 5,
    gap: 10,
    // margin: "auto",
    // justifyContent: "center",
    // alignItems: "center",
  },
  goalsHeading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#eeeeee",
  },
});
