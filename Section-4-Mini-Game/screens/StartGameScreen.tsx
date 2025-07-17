import { TextInput, View, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import { Colors } from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  instructionText: {
    color: "white",
    fontSize: 24,
  },
  inputContainer: {
    // flex: 1,
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    // NOTE: Adding shadows (platform specific):
    elevation: 8, // Android only
    // Following are iOS only:
    shadowColor: "black",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 60,
    width: 60,
    fontSize: 32,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    marginVertical: 8,
    marginHorizontal: "auto",
    fontWeight: "bold",
  },
  buttonContainer: {
    // width: "100%",
    flexDirection: "row",
    gap: 2,
    justifyContent: "center",
  },
});

interface StartGameScreenProps {
  setUserNumber: React.Dispatch<React.SetStateAction<number | null>>;
}
const StartGameScreen: React.FC<StartGameScreenProps> = ({ setUserNumber }) => {
  const [userInput, setUserInput] = useState("");

  const resetUserInput = () => setUserInput("");
  const confirmNumberInput = () => {
    const numberInput = Number.parseInt(userInput);
    if (isNaN(numberInput) || numberInput < 1 || numberInput > 99) {
      Alert.alert("Invalid number", "Number has to be between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetUserInput },
      ]);
      // NOTE: alert (without Alert.alert) can also be used, but that only expects the body text,
      // can't change the heading, or the button text
      return;
    }
    setUserNumber(numberInput);
  };
  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          value={userInput}
          onChangeText={(newText) => setUserInput(newText)}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.numberInput}
          maxLength={2}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton style={{ flex: 1 }} onPress={resetUserInput}>
            Reset
          </PrimaryButton>
          <PrimaryButton
            style={{ flex: 1 }}
            // disabled={!userInput}
            onPress={confirmNumberInput}
          >
            Confirm
          </PrimaryButton>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;
