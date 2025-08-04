import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { EditableExpenseFields, RootStackParamList } from "../types";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";

import { ExpensesContext } from "../store/context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AxiosError } from "axios";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },

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

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const expensesContext = useContext(ExpensesContext);
  const existingExpense = expensesContext.expenses.find((expense) => expense.id === expenseId);

  const deleteExpenseHandler = async () => {
    if (isNewExpense) return;
    try {
      setIsLoading(true);
      await deleteExpense(expenseId);
      expensesContext.removeExpense(expenseId);
      // setIsLoading(false); // Not need as we are closing the screen next line.
      navigation.goBack();
    } catch (error) {
      console.log("🚀 ~ deleteExpenseHandler ~ error:", JSON.stringify(error, null, 2));
      const err = error as AxiosError;
      setErrorMessage(
        `${err.message === "Network Error" ? `${err.message}! ` : ""}Could not delete expense`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAddOrEditExpense = () => {
    navigation.goBack();
  };

  const saveExpense = async (expenseData: EditableExpenseFields) => {
    // Add expense to local store (Context), and then to DB via API
    setIsLoading(true);
    try {
      if (isNewExpense) {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ id, ...expenseData });
      } else {
        // NOTE: here TS knows that expenseId is a string, not string | undefined
        await updateExpense(expenseId, expenseData);
        expensesContext.updateExpense(expenseId, expenseData);
      }
      // setIsLoading(false); // Not need as we are closing the screen next line.
      navigation.goBack();
    } catch (error) {
      console.log("🚀 ~ saveExpense ~ error:", JSON.stringify(error, null, 2));
      const err = error as AxiosError;
      setErrorMessage(
        `${err.message === "Network Error" ? `${err.message}! ` : ""}Could not save expense`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const errorHandler = () => setErrorMessage(null);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (errorMessage) {
    return <ErrorOverlay message={errorMessage} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        existingExpense={existingExpense}
        submitButtonLabel={isNewExpense ? "Add" : "Edit"}
        onCancel={cancelAddOrEditExpense}
        saveExpense={saveExpense}
      />
      {!isNewExpense && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;
