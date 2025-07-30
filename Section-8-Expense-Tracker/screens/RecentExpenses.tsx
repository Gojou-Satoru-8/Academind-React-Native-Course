import { useContext } from "react";
import { ExpensesContext } from "../store/context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { isDateTimeWithinLastWeek } from "../util/date";

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  const recentExpenses = expenses.filter((exp) => isDateTimeWithinLastWeek(exp.date));
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 days"}
      // fallbackText="No expenses registered in the last 7 days"
    />
  );
};

export default RecentExpenses;
