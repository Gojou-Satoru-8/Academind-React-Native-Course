import { Text, GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.primary500,
  },
  pressed: { opacity: 0.7 },
  icon: { marginRight: 6 },
  text: { color: Colors.primary500 },
});

interface OutlinedButtonProps {
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ icon, onPress, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={18} color={Colors.primary500} style={styles.icon} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;
