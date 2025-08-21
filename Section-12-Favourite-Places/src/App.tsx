import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import * as Font from "expo-font";
import { createURL } from "expo-linking";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import Navigation from "./navigation";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { initDB } from "./util/database";
import ErrorScreen from "./navigation/screens/Error";
const prefix = createURL("/");

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const [appIsReady, setAppIsReady] = useState(false);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    const prepare = async function () {
      try {
        await Font.loadAsync(Ionicons.font);
        await initDB();
      } catch (error) {
        console.log("🚀 ~ prepare ~ error:", error);
        if (error instanceof Error) setLoadingError(error?.message);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  if (!appIsReady) return null;

  if (loadingError) return <ErrorScreen message={loadingError} />;
  return (
    <>
      <StatusBar style="auto" />
      <Navigation
        theme={theme}
        linking={{
          enabled: "auto",
          prefixes: [prefix],
        }}
        onReady={async () => {
          // await Font.loadAsync(Ionicons.font); // Doesn't solve the problem of Ionicons missing in display
          SplashScreen.hideAsync();
        }}
      />
    </>
  );
}
