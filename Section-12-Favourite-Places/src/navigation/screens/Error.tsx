import { StyleSheet, View, DevSettings, Text } from "react-native";

import Button from "../../components/UI/Button";

interface ErrorScreenProps {
  message: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An error occured</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={() => DevSettings.reload()}>Reload App</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  text: { fontSize: 16, textAlign: "center" },
});

export default ErrorScreen;
