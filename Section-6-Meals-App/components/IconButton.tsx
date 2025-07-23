import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  pressed: { opacity: 0.7 },
});

interface IconButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
}
const IconButton: React.FC<IconButtonProps> = ({ onPress, icon, color }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Ionicons name={icon ? icon : "star"} size={24} color={color ? color : "white"} />
    </Pressable>
  );
};

export default IconButton;
