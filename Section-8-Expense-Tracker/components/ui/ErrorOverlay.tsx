import { StyleSheet, View, Text } from "react-native";
import Button from "./Button";
// import { GlobalStyles } from "../../constants/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    // backgroundColor: GlobalStyles.colors.primary700,
  },
  text: { color: "white", textAlign: "center", marginBottom: 8 },
  title: { fontSize: 20, fontWeight: "bold" },
  // message: { fontSize: 14 }, // Default fontSize is 14, so no need.
});

interface ErrorOverlayProps {
  message: string;
  onConfirm: () => void;
}
const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;
