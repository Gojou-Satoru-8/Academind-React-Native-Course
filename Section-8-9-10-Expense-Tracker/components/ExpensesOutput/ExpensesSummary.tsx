import { StyleSheet, View, Text } from "react-native";
import { Expense } from "../../types";
import { GlobalStyles } from "../../constants/styles";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 14,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});

interface ExpesnsesSummaryProps {
  expenses: Expense[];
  expensesPeriod: string;
}
const ExpensesSummary: React.FC<ExpesnsesSummaryProps> = ({ expenses, expensesPeriod }) => {
  const expensesSum = expenses.reduce((prevValue, expense) => prevValue + expense.amount, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{expensesPeriod}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
