import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
    color: "#351401",
    textAlign: "center",
  },
});

interface ListProps {
  data: string[];
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <Text style={styles.listItem} key={item}>
          {item}
        </Text>
      ))}
    </>
  );
};

export default List;
