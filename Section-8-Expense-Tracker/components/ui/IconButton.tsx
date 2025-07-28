import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const styles = StyleSheet.create({
  buttonContainer: { borderRadius: 24, padding: 6, marginHorizontal: 8, marginVertical: 2 },
  pressed: { opacity: 0.75 },
});

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, size = 24, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
