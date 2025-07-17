import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "open-sans-bold", // NOTE: Regular and bold fonts are to be applied separately,
    // ie you can't specify fontFamily as "open-sans", and then expect fontWeight: "bold" to apply.
    // For regular, use fontFamily: "open-sans", and for bold, use fontFamily; "open-sans-bold"
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "white",
    padding: 12,
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
