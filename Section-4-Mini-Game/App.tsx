"use strict";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import * as Font from "expo-font";
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

SplashScreen.preventAutoHideAsync();
// NOTE: Keep it outside component to prevent from triggering everytime

export default function App() {
  // Hide the splash screen and load fonts first:
  // NOTE: Here this is opposite of the regular "pending/loading" state, which is true when
  // something is loading. Instead, useFonts returns an array with the first element being whether
  // the fonts have been completely loaded, thus it's false when the fonts are loading.
  // const [fontsLoaded, fontsError] = Font.useFonts({
  //   "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  //   "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  // });
  // console.log("🚀 ~ App ~ fontsLoaded:", fontsLoaded);
  // console.log("🚀 ~ App ~ fontsError:", fontsError);

  // ALSO NOTE: This way of loading fonts still throws an exception on some cases like path being
  // incorrect, instead of returning the error value inside fontsError. Thus the other way of loading
  // fonts, loadAsync can be used inside a useEffect().

  const [appIsReady, setAppIsReady] = useState(false);
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [guessRounds, setGuessRounds] = useState<number[]>([]);
  const [gameIsOver, setGameIsOver] = useState(false);

  console.log("🚀 ~ App ~ gameIsOver:", gameIsOver);
  console.log("🚀 ~ rounds:", guessRounds);

  const endGame = useCallback(() => setGameIsOver(true), [setGameIsOver]);
  const addRound = (currentGuess: number) =>
    setGuessRounds((current) => [currentGuess, ...current]);
  const startNewGame = () => {
    setUserNumber(null);
    setGameIsOver(false);
    setGuessRounds([]);
  };

  // if (!fontsLoaded) {
  // return <AppLoading />;
  // NOTE: expo-app-loading has been deprecated, use expo-splash-screen instead.
  // return;
  // }

  // useEffect(() => {
  //   // For use with useFonts in combination with SplashScreen methods
  //   if (fontsLoaded || fontsError) {
  //     // Hide splash screen whether fonts were loaded successfully or if there was error
  //     SplashScreen.hideAsync();
  //     setAppIsReady(true);
  //   }
  // }, [fontsLoaded, fontsError]);

  useEffect(() => {
    const prepareFonts = async () => {
      // NOTE: This is better than useFonts, cuz this allows clear try-catch blocks
      try {
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
      } catch (error) {
        console.warn("🚀 ~ prepare ~ error:", error);
      } finally {
        // Whether fonts were loaded correctly or not, hide splash screen and set app ready to show content
        SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    };
    prepareFonts();
  }, []);

  if (!appIsReady) return null;

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
