import { useContext } from "react";
import { ExpensesContext } from "../store/context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod={"Total"}
      // fallbackText="No registered expenses found"
    />
  );
};

export default AllExpenses;
