import { View, StyleSheet } from "react-native";
import { Expense } from "../../types";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES: Expense[] = [
  { id: "e1", description: "A pair of shoes", amount: 59.99, date: new Date("2025-07-19") },
  { id: "e2", description: "A pair of trousers", amount: 89.99, date: new Date("2025-05-18") },
  { id: "e3", description: "Some bananas", amount: 5.99, date: new Date("2025-06-23") },
  { id: "e4", description: "A book", amount: 14.99, date: new Date("2024-12-19") },
  { id: "e5", description: "Another book", amount: 18.59, date: new Date("2024-11-15") },
  { id: "e6", description: "Another book", amount: 18.59, date: new Date("2024-11-15") },
  { id: "e7", description: "Another book", amount: 18.59, date: new Date("2024-11-15") },
  { id: "e8", description: "Another book", amount: 18.59, date: new Date("2024-11-15") },
  { id: "e9", description: "Another book", amount: 18.59, date: new Date("2024-11-15") },
  { id: "e10", description: "Another book", amount: 18.59, date: new Date("2024-11-15") },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

interface ExpensesOutputProps {
  expenses: Expense[];
  expensesPeriod: string;
}
const ExpensesOutput: React.FC<ExpensesOutputProps> = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} expensesPeriod={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;
