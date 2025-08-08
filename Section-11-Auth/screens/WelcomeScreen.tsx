import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../store/context";
import Button from "../components/ui/Button";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const authContext = useAuthContext();

  const fetchMessage = useCallback(async () => {
    try {
      const response = await axios.get<string>(
        `https://academind-rn-expense-app-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=${authContext.token}`
      );

      const message = response.data;
      console.log("🚀 ~ fetchMessage ~ message:", message);
      setFetchedMessage(message);
    } catch (error) {
      console.log("🚀 ~ fetchMessage ~ error:", JSON.stringify(error, null, 2));
      const err = error as AxiosError;
      // setFetchedMessage(err.message);
      if (err.status === 401) {
        Alert.alert("Error", "Session expired! Please log in again.");
        authContext.logout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      {fetchedMessage && <Text>{fetchedMessage}</Text>}
      <Button onPress={fetchMessage}>Refresh Message</Button>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
