import { Text, Pressable, GestureResponderEvent, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2, // android
    // ios below:
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.75,
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 4,
  },

  pressed: { opacity: 0.7 },

  text: { textAlign: "center", fontSize: 16 },
});

interface ButtonProps {
  children?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
}
const Button: React.FC<ButtonProps> = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;
