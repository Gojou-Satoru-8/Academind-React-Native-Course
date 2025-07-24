import { View, Text, Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    // backgroundColor: "#72063c",
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 6, // Android shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  disabledBackground: {
    backgroundColor: Colors.primary500Faded,
  },
  disabledText: {
    color: "#ddd",
  },
});

interface PrimaryButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  style?: {
    width?: number;
    height?: number;
    flex?: number;
  };
  onPress?: (event: GestureResponderEvent) => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, style, disabled, onPress }) => {
  return (
    <View style={{ ...styles.buttonOuterContainer, ...(style && style) }}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        style={({ pressed }) => {
          // const style = { ...styles.buttonInnerContainer };
          // if (pressed) style.opacity = 0.75;
          // OR:
          // const style = pressed
          //   ? { ...styles.buttonInnerContainer, ...styles.pressed }
          //   : { ...styles.buttonInnerContainer };
          // return style;
          // OR:
          return {
            ...styles.buttonInnerContainer,
            ...(pressed && !disabled && styles.pressed),
            // Here, !disabled ensures the pressing effect only applies when the button is active (it's optional)
            ...(disabled && styles.disabledBackground),
          };
        }}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={{ ...styles.buttonText, ...(disabled && styles.disabledText) }}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;
