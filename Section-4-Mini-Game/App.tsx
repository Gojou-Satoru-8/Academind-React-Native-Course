import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { Colors } from "./constants/colors";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: "#ddb52f",
  },
  backgroundImage: { opacity: 0.15 },
});

// let guessRounds = 1; // This doesn't work as when passed to a child component (Game Screen here),
// a copy of this value is created within the context of the GameScreen component function. Thus,
// while this is incremented on calling incrementRound(), the guessRound being shown to the screen is
// the one copied over. If it was within the same file, it would have worked as the line
// setCurrentGuess(newGuess) re-renders with the updated value of guessRounds.

export default function App() {
  // Load fonts first:
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  }); // NOTE: Here this is opposite of the regular "pending/loading" state, which is true when
  console.log("🚀 ~ App ~ fontsLoaded:", fontsLoaded);

  // something is loading. Instead, useFonts returns an array with the first element being whether
  // the fonts have been completely loaded, thus it's false when the fonts are loading.

  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [guessRounds, setGuessRounds] = useState<number[]>([]);
  const [gameIsOver, setGameIsOver] = useState(false);

  console.log("🚀 ~ App ~ gameIsOver:", gameIsOver);
  console.log("🚀 ~ rounds:", guessRounds);

  const endGame = useCallback(() => setGameIsOver(true), [setGameIsOver]);
  const addRound = (currentGuess: number) =>
    setGuessRounds((current) => [currentGuess, ...current]);

  if (!fontsLoaded) {
    // return <AppLoading />;
    // expo-app-loading has been deprecated, use expo-splash-screen instead.
    return;
  }

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  const startNewGame = () => {
    setUserNumber(null);
    setGameIsOver(false);
    setGuessRounds([]);
  };

  return (
    <LinearGradient style={styles.screen} colors={[Colors.primary700, Colors.accent500]}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.screen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.screen}>
          {gameIsOver ? (
            <GameOverScreen
              userNumber={userNumber as number}
              guessRounds={guessRounds}
              startNewGame={startNewGame}
            />
          ) : userNumber ? (
            <GameScreen
              userNumber={userNumber}
              endGame={endGame}
              guessRounds={guessRounds}
              addRound={addRound}
            />
          ) : (
            <StartGameScreen setUserNumber={setUserNumber} />
          )}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}
