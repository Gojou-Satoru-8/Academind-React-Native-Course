import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../types";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/context";

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
    navigation.setOptions({
      title: isNewExpense ? "Add Expense" : "Edit Expense",
      // presentation: "modal", // This doesn't have an effect here, cuz this runs after the
      // ManageExpense screen is navigated to.
    });
  }, [isNewExpense, navigation]);

  const expensesContext = useContext(ExpensesContext);

  const deleteExpense = () => {
    if (isNewExpense) return;
    expensesContext.removeExpense(expenseId);
    navigation.goBack();
  };

  const cancelAddOrEditExpense = () => {
    navigation.goBack();
  };

  const addOrEditExpense = () => {
    if (isNewExpense) {
      expensesContext.addExpense({ amount: 83.99, description: "New Expense", date: new Date() });
    } else {
      // NOTE: here TS knows that expenseId is a string, not string | undefined
      expensesContext.updateExpense(expenseId, { amount: 49.99, description: "Updated Expense" });
    }
    navigation.goBack();
  };

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
