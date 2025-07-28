import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../types";
import { useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: GlobalStyles.colors.primary800 },

  buttons: { flexDirection: "row", justifyContent: "center", alignItems: "center" },

  button: { minWidth: 120, marginHorizontal: 8 },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

type ManageExpenseScreenProps = NativeStackScreenProps<RootStackParamList, "ManageExpenseScreen">;
const ManageExpense: React.FC<ManageExpenseScreenProps> = ({ route, navigation }) => {
  console.log("🚀 ~ ManageExpense ~ route:", route);
  const expenseId = route.params?.expenseId;
  const isNewExpense = !expenseId; // Or !Boolean(expenseId)
  // const isEditing = !!expenseId; // Or Boolean(expenseId)

  useLayoutEffect(() => {
    navigation.setOptions({ title: isNewExpense ? "Add Expense" : "Edit Expense" });
  }, [isNewExpense, navigation]);

  const deleteExpense = () => {};
  const cancelAddOrEditExpense = () => {};
  const addOrEditExpense = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button onPress={cancelAddOrEditExpense} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={addOrEditExpense} style={styles.button}>
          {isNewExpense ? "Add" : "Edit"}
        </Button>
      </View>
      {!isNewExpense && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;
