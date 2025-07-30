import { View, Text, StyleSheet } from "react-native";
import { Expense, MainScreensTabParamList } from "../../types";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
import { RouteProp, useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

interface ExpensesOutputProps {
  expenses: Expense[];
  expensesPeriod: string;
  fallbackText?: string;
}

const ExpensesOutput: React.FC<ExpensesOutputProps> = ({
  expenses,
  expensesPeriod,
  fallbackText,
}) => {
  const route = useRoute<RouteProp<MainScreensTabParamList>>();
  console.log("🚀 ~ ExpensesOutput ~ route:", route);

  const finalFallbackText = fallbackText
    ? fallbackText
    : route.name === "AllExpenses"
    ? "No registered expenses found"
    : "No expenses registered in the last 7 days";

  const content =
    expenses.length > 0 ? (
      <ExpensesList expenses={expenses} />
    ) : (
      <Text style={styles.infoText}>{finalFallbackText}</Text>
    );

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      {content}
    </View>
  );
};

export default ExpensesOutput;
