import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  // Dimensions,
  useWindowDimensions,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import { Colors } from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
// import { StatusBar } from "expo-status-bar";

// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  rootContainer: {
    flex: 1,
    alignItems: "center",
    // marginVertical: deviceHeight < 400 ? 30 : 100, // This value is calculated once at launch, and
    // doesn't change dynamically, causing issues when changing orientation, as marginVertical is
    // locked / hard-coded. So dynamic values must be used instead (see component code below)
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

  // Getting dynamic window sizing (responding to orientation):
  // const { width, height } = Dimensions.get("window");
  // But this doesn't listen and update for orientation changes. So use this hook instead:
  const { width, height } = useWindowDimensions();
  // const dimensions = Dimensions.get("window");
  // console.log("🚀 ~ width | height:", width, height);
  // console.log("🚀 ~ dimensions:", dimensions.width, dimensions.height);

  const marginTop = height < 450 ? 30 : 100;

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
    <ScrollView style={styles.screen}>
      {/* NOTE: ios keyboards can't be hidden on tap inside a View, as View is untappable, possible alternatives are ScrollView, FlatList and TouchableWithoutFeedback */}
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop }]}>
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
            {/* <StatusBar style="inverted" /> 
            StatusBar can be placed anywhere
            */}
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;
