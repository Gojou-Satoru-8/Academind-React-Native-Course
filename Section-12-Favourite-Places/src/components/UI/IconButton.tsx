import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  button: { padding: 8, justifyContent: "center", alignItems: "center" },
  pressed: { opacity: 0.7 },
});

type IconButtonProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress?: (e: GestureResponderEvent) => void;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, size = 24, color = "black", onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
