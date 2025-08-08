import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { AsyncStorageKeys } from "../types";
import { useAuthContext } from "../store/context";
import { Alert, AppState, AppStateStatus, PanResponder } from "react-native";
import { extendSession } from "../util/auth";
import * as SplashScreen from "expo-splash-screen";
import { AxiosError } from "axios";

SplashScreen.preventAutoHideAsync();

let sessionExtensionTimeout: NodeJS.Timeout | null = null;

const useAuthCheck = () => {
  const authContext = useAuthContext();
  console.log("Auth check hook ran | authContext: ", authContext);
  const { authenticate, logout } = authContext;

  const [isAppReady, setIsAppReady] = useState(false);
  const lastInteractionDateTimeRef = useRef<number>(Date.now());
  const panResponder = useRef(
    // NOTE: PanResponder's panHandlers property can be spread into any component to allow it to
    // handle events. Here, we're using it to update the lastUsedDateTimeRef.current
    // The ref used here is for panResponder to be persistent across re-renders.
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        lastInteractionDateTimeRef.current = Date.now();
      },
    })
  ).current;

  useEffect(() => {
    const handleActiveChange = (nextAppState: AppStateStatus) => {
      console.log("App State:", nextAppState);
      // active | inactive for "ios", background for "android"
      // Whenever uses closes the app or reopens it, save the last used time.
      AsyncStorage.setItem(AsyncStorageKeys.LAST_USED_DATETIME, new Date().getTime().toString());
      // if (nextAppState === "active") {
      //   lastUsedTimeRef.current = Date.now();
      // }
      // NOTE: Let lastUsedTimeRef.current be only affected by user interaction, not app-state change.
    };
    AppState.addEventListener("change", handleActiveChange);
    // return () => {
    //   AppState.removeEventListener("change", handleActiveChange);
    // NOTE: This method doesn't exist.
    // };
  }, []);

  useEffect(() => {
    const setSessionExtensionTimeout = (refreshToken: string, expiryDateTime: number) => {
      const timeToExpiryMs = expiryDateTime - Date.now();
      const twoMinutesInMs = 1000 * 60 * 2;
      console.log("Time remaining for this session: ", timeToExpiryMs / (1000 * 60));
      if (sessionExtensionTimeout) clearTimeout(sessionExtensionTimeout);

      sessionExtensionTimeout = setTimeout(async () => {
        // latestActiveDatTime is the greater among lastInteractionDateTimeRef.current and
        // lastUsedDateTime from Async Storage
        let latestActiveDateTime = lastInteractionDateTimeRef.current;
        const lastUsedDateTime = await AsyncStorage.getItem(AsyncStorageKeys.LAST_USED_DATETIME);
        if (lastUsedDateTime && +lastUsedDateTime > latestActiveDateTime) {
          latestActiveDateTime = +lastUsedDateTime;
        }
        const usedWithinLast10Min = Date.now() - latestActiveDateTime <= 1000 * 60 * 10;
        if (usedWithinLast10Min) {
          try {
            // App was used in the last 10 minutes, refresh and extend session
            const responseData = await extendSession(refreshToken);
            authenticate(
              responseData.id_token,
              Date.now() + +responseData.expires_in * 1000,
              responseData.refresh_token
            );
          } catch (error) {
            const err = error as AxiosError;
            if (err.status === 401) {
              logout();
              Alert.alert("Session expired", "Please login again");
            }
            console.log("Unable to extend session");
          }
        }
      }, timeToExpiryMs - twoMinutesInMs); // Run the timeout 2 minutes before expiry
    };

    const authenticateIfCredentialsPresent = async () => {
      const storedToken = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
      const expiryDateTime = await AsyncStorage.getItem(AsyncStorageKeys.EXPIRY_DATETIME);
      const refreshToken = await AsyncStorage.getItem(AsyncStorageKeys.REFRESH_TOKEN);

      if (storedToken && expiryDateTime && refreshToken) {
        // Means user was logged in, but session may be stale
        if (Date.now() >= +expiryDateTime) {
          logout(); // Session is stale, remove all auth related keys from AsyncStorage
          Alert.alert("Session expired", "Please login again");
          return;
        }

        // Session is still active:
        authenticate(storedToken, +expiryDateTime, refreshToken);
        setSessionExtensionTimeout(refreshToken, +expiryDateTime);
      }
      setIsAppReady(true);
      // SplashScreen.hide();
      await SplashScreen.hideAsync();
    };
    authenticateIfCredentialsPresent();
    // Below is the reason authContext had to be destructured, as authContext is an object without
    // stable identity. So either use ref with auth context, or use the individual functions, as
    // these are wrapped within useCallback.
  }, [authenticate, logout]);

  return {
    isAppReady,
    isAuthenticated: authContext.isAuthenticated,
    panResponder,
  };
};

export default useAuthCheck;
