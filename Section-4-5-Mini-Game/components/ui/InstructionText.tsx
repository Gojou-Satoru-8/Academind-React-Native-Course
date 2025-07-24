import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    fontSize: 24,
    color: "white",
  },
});

interface InstructionTextProps {
  children: React.ReactNode;
  style?: object;
}
const InstructionText: React.FC<InstructionTextProps> = ({ children, style }) => {
  //   return <Text style={{ ...styles.instructionText, ...style }}>{children}</Text>;   // OR:
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;
