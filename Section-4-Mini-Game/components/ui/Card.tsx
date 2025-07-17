import { View, StyleSheet } from "react-native";
import { Colors, Shadows } from "../../constants/colors";

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    ...Shadows,
  },
});

interface CardProps {
  children: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;
