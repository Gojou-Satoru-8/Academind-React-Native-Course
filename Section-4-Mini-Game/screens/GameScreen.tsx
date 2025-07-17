import { View, StyleSheet, Alert, Text, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomNumber = (min: number, max: number, exclude?: number) => {
  const maxi = Number.parseInt(String(max));
  const mini = Number.parseInt(String(min));
  console.log("🚀 ~ generateRandomNumber ~ mini:", mini, " | maxi", maxi);

  if (Number.isNaN(mini) || Number.isNaN(maxi)) {
    throw new Error("Invalid number");
  }
  //   if (!(mini < maxi)) throw new Error("Min must be greater than max");
  // NOTE: This logic will cause error cuz in case the largest possible value is chosen by user
  // (ie 99), then there will definitely be a call where mini and maxi both are 99.
  // Following is okay, as it is a case where both are possible equal, and the new randomNumber will
  // also be equal to both. The error will never be triggered, as we shift away from the screen, right
  // after the new (correct) guess is generated.
  if (mini > maxi) throw new Error("Min must be greater than max");
  const randomNumber = Math.floor(Math.random() * (maxi - mini + 1)) + mini;

  if (randomNumber === exclude) return generateRandomNumber(mini, maxi, exclude);

  return randomNumber;
};

let minBoundary = 1;
let maxBoundary = 99;

interface GameScreenProps {
  userNumber: number;
  endGame: () => void;
  guessRounds: number[];
  addRound: (currentGuess: number) => void;
}

const initialGuess = generateRandomNumber(1, 99);
// let count = 1;
const GameScreen: React.FC<GameScreenProps> = ({ userNumber, endGame, guessRounds, addRound }) => {
  console.log("🚀 ~ guessRounds:", guessRounds);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  // State is initialized with a random guess
  console.log(minBoundary, currentGuess, maxBoundary);
  const generateNextGuess = (direction: "higher" | "lower") => {
    if (
      (userNumber > currentGuess && direction === "lower") ||
      (userNumber < currentGuess && direction === "higher")
    ) {
      Alert.alert("Misleading direction", "Please do not lie about the direction", [
        { text: "Sorry :)", style: "cancel" },
      ]);
      return;
    }

    if (direction === "higher") {
      minBoundary = currentGuess + 1;
    } else maxBoundary = currentGuess - 1;
    const newGuess = generateRandomNumber(minBoundary, maxBoundary);
    addRound(currentGuess);
    // count += 1;
    setCurrentGuess(newGuess);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      alert("Won");
      minBoundary = 1;
      maxBoundary = 99;
      addRound(currentGuess);
      endGame();
    }
  }, [currentGuess, userNumber, endGame]);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={generateNextGuess.bind(null, "lower")} style={{ flex: 1 }}>
            <Ionicons name="remove" size={24} color="white" />
          </PrimaryButton>
          <PrimaryButton onPress={generateNextGuess.bind(null, "higher")} style={{ flex: 1 }}>
            <Ionicons name="add" size={24} color="white" />
          </PrimaryButton>
        </View>
      </Card>
      {/* <ScrollView>
        {guessRounds.map((guess) => (
          <Text key={guess}>{guess}</Text>
        ))}
      </ScrollView> */}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => {
            return (
              <GuessLogItem
                roundNumber={guessRounds.length - itemData.index}
                guess={itemData.item}
              />
            );
          }}
          keyExtractor={(item) => String(item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24 },
  buttonContainer: {
    // marginTop: 24,
    paddingHorizontal: 30,
    flexDirection: "row",
  },
  instructionText: { marginBottom: 12 },
  listContainer: { flex: 1, padding: 16 },
});

export default GameScreen;
