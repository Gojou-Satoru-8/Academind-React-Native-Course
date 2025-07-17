import { View, Text, StyleSheet } from "react-native";
import { Colors, Shadows } from "../../constants/colors";

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    ...Shadows,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});

interface GuessLogItemProps {
  roundNumber: number;
  guess: number;
}
const GuessLogItem: React.FC<GuessLogItemProps> = ({ roundNumber, guess }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>{guess}</Text>
    </View>
  );
};

export default GuessLogItem;
