import { Text, StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "open-sans-bold", // NOTE: Regular and bold fonts are to be applied separately,
    // ie you can't specify fontFamily as "open-sans", and then expect fontWeight: "bold" to apply.
    // For regular, use fontFamily: "open-sans", and for bold, use fontFamily; "open-sans-bold"
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    // borderWidth: 2,
    // Conditionally setting borderWidth based on platform:
    // borderWidth: Platform.OS === "android" ? 2 : 0, // Method 1
    // Method 2: Platform.Select() returns whatever you pass to it
    // borderWidth: Platform.select({ ios: 0, android: 2 }), // Here, ios: 2 property can be omitted
    // OR (as Platform.select returns whatever you pass to it):
    ...Platform.select({ android: { borderWidth: 2 } }),
    borderRadius: 8,
    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
    width: 300, // Takes width 300px as long as maxWidth condition is satisfied.
    // marginHorizontal: "auto",
  },
});

interface TitleProps {
  children: React.ReactNode;
  color?: string;
  borderColor?: string;
}
const Title: React.FC<TitleProps> = ({ children, color, borderColor }) => {
  return (
    <Text
      style={{
        ...styles.title,
        ...(color && { color }),
        ...(borderColor && { borderColor }),
      }}
    >
      {children}
    </Text>
  );
};

export default Title;
