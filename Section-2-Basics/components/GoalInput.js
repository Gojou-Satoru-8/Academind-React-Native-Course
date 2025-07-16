import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#311b6b",
    padding: 16,
    flex: 1,
    // display: "flex", // NOTE: Not required as flex is enabled by default
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // gap: 20,
    // marginBottom: 24,
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
    gap: 20,
  },
  image: { width: 100, height: 100 },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    borderRadius: 8,
    color: "#120438",
    // flex: 1,
    width: "100%",
    // marginRight: 8,
    padding: 16,
  },
  buttonContainer: { flexDirection: "row", gap: 5 },
  button: {
    width: "30%",
    // marginHorizontal: 8,
  },
});

const GoalInput = ({ isModalVisible, closeModal, setCourseGoals }) => {
  const [goalInput, setGoalInput] = useState("");
  const addGoal = () => {
    if (!goalInput) {
      alert("Add some goal");
      return;
    }
    setCourseGoals((current) => [
      ...current,
      {
        text: goalInput.trim(),
        // key: Math.random().toString()  // Directly used by FlatList to set the keys of each item
        id: Math.random().toString(),
      },
    ]);
    setGoalInput("");
    closeModal();
  };
  return (
    <Modal visible={isModalVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image source={require("../assets/goal.png")} style={styles.image} />
        <TextInput
          //   placeholder="Your course goal"
          style={styles.textInput}
          value={goalInput}
          // onChange={(e) => {
          //   console.log(e.target.value); // No value property on e.target
          //   setGoalInput(e);
          // }}
          // NOTE: Above doesn't work like in normal react, use onChangeText
          onChangeText={(text) => setGoalInput(text)}
          onSubmitEditing={addGoal}
          returnKeyLabel="Add"
          returnKeyType="done"
          enablesReturnKeyAutomatically
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={closeModal} color={"#f31282"} />
          </View>
          <View style={styles.button}>
            <Button title="Add" onPress={addGoal} color={"#b180f0"} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;
