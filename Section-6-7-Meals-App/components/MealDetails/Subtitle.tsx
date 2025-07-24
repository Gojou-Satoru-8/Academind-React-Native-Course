import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  subtitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
    marginHorizontal: 12,
    padding: 6,
    textAlign: "center",
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
  },
});

interface SubtitleProps {
  children: string;
  style?: object;
}

const Subtitle: React.FC<SubtitleProps> = ({ children }) => {
  return <Text style={styles.subtitle}>{children}</Text>;
};

export default Subtitle;
