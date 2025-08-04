import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { isDateTimeWithinLastWeek } from "../util/date";
import { fetchExpenses } from "../util/http";
import { Expense } from "../types";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AxiosError } from "axios";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { expenses, setExpenses } = useContext(ExpensesContext);
  const recentExpenses = expenses.filter((exp) => isDateTimeWithinLastWeek(exp.date));

  useEffect(() => {
    const fetchAndSetExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses: Awaited<Expense[]> = await fetchExpenses(); // The type is optional here
        setExpenses(expenses);
      } catch (error: unknown) {
        const err = error as AxiosError;
        setErrorMessage(
          `${err.message === "Network Error" ? `${err.message}! ` : ""} Failed to fetch expenses`
        );
      } finally {
        setIsFetching(false);
      }
    };
    fetchAndSetExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorHandler = () => setErrorMessage(null);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (errorMessage) {
    return <ErrorOverlay message={errorMessage} onConfirm={errorHandler} />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 days"}
      // fallbackText="No expenses registered in the last 7 days"
    />
  );
};

export default RecentExpenses;
