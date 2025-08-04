import { Pressable, View, Text, StyleSheet, GestureResponderEvent } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const styles = StyleSheet.create({
  button: { borderRadius: 4, padding: 8, backgroundColor: GlobalStyles.colors.primary500 },
  buttonText: { color: "white", textAlign: "center" },
  flat: { backgroundColor: "transparent" },
  flatText: { color: GlobalStyles.colors.primary200 },
  pressed: { opacity: 0.75, backgroundColor: GlobalStyles.colors.primary100 },
});

interface ButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  mode?: "normal" | "flat";
  style?: object;
}
const Button: React.FC<ButtonProps> = ({ children, onPress, mode = "normal", style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          mode === "flat" && styles.flat,
          pressed && styles.pressed,
        ]}
      >
        {/* <View style={[styles.button, mode === "flat" && styles.flat]}> */}
        <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>{children}</Text>
        {/* </View> */}
      </Pressable>
    </View>
  );
};

export default Button;
