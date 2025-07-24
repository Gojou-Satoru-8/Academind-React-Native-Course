import {
  View,
  Image,
  StyleSheet,
  Text,
  // Dimensions,
  useWindowDimensions,
  ScrollView,
  Platform,
} from "react-native";
import Title from "../components/ui/Title";
import { Colors } from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: 300,  // NOTE: These values are too large for small screens, and relative values like
    // height: 300, // percentages can't be used cuz they width and height of container are different.
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150, // Rule of thumb for perfect circle, half of width & height

    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});

interface GameOverScreenProps {
  userNumber: number;
  guessRounds: number[];
  startNewGame: () => void;
}
const GameOverScreen: React.FC<GameOverScreenProps> = ({
  userNumber,
  guessRounds,
  startNewGame,
}) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 300; // Normal imageSize in portrait mode of modern screens
  if (width < 380) imageSize = 150; // For older devices with smaller screen
  if (height < 450) imageSize = 80; // For landscape orientation

  const imageStyle = { width: imageSize, height: imageSize, borderRadius: imageSize / 2 };
  // NOTE: borderRadius: "100%" works in practice (in code), but as per documentation, shouldn't work

  let marginTop = 0;
  if (Platform.OS === "android" && width < height) marginTop = 30;

  return (
    <ScrollView style={[styles.screen, { marginTop }]}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{guessRounds.length}</Text> rounds to
          guess the number <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={startNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;
