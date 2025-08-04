import { createContext, Reducer, useReducer } from "react";
import { Expense, EditableExpenseFields } from "../types";

// const DUMMY_EXPENSES: Expense[] = [
//   { id: "e1", description: "A pair of shoes", amount: 59.99, date: new Date("2025-07-23") },
//   { id: "e2", description: "A pair of trousers", amount: 89.99, date: new Date("2025-05-18") },
//   { id: "e3", description: "Some bananas", amount: 5.99, date: new Date("2025-06-23") },
//   { id: "e4", description: "A book", amount: 14.99, date: new Date("2024-12-19") },
//   { id: "e5", description: "Another book", amount: 18.59, date: new Date("2024-11-15") },
//   // NOTE: Not providing a time (after T) in ISO Format means that the time will be set to 00:00:00.000Z (UTC midnight)
// ];

interface ExpensesContextType {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expenseData: Expense) => void;
  removeExpense: (expenseId: string) => void;
  updateExpense: (expenseId: string, expenseData: Partial<EditableExpenseFields>) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  setExpenses: () => {},
  addExpense: () => {},
  removeExpense: () => {},
  updateExpense: () => {},
});

// NOTE: Using DISCRIMINATED UNION types to select the specific payload required, based on "type"
type SetExpensesAction = { type: "SET"; payload: Expense[] };
type AddReducerAction = { type: "ADD"; payload: Expense };
type RemoveReducerAction = { type: "REMOVE"; payload: { expenseId: string } };
type UpdateReducerAction = {
  type: "UPDATE";
  payload: { expenseId: string; expenseData: Partial<EditableExpenseFields> };
};
type ExpensesReducerAction =
  | SetExpensesAction
  | AddReducerAction
  | RemoveReducerAction
  | UpdateReducerAction;

const expensesReducer: Reducer<Expense[], ExpensesReducerAction> = (state, action) => {
  // OR instead of Reducer<StateProp, ActionProp>, you can directly assign it inside the function
  // arguments
  if (action.type === "SET") {
    return action.payload.sort((exp1, exp2) => exp2.date.getTime() - exp1.date.getTime());
    // Sorted order: greater UNIX time at the beginning, ie most recent first
  } else if (action.type === "ADD") {
    return [{ ...action.payload }, ...state];
  } else if (action.type === "REMOVE") {
    return state.filter((exp) => exp.id !== action.payload.expenseId);
  } else if (action.type === "UPDATE") {
    const index = state.findIndex((exp) => exp.id === action.payload.expenseId);
    const updatedExpenses = [...state];
    updatedExpenses[index] = { ...updatedExpenses[index], ...action.payload.expenseData };
    return updatedExpenses;
  } else return state;
};

interface ExpensesProviderProps {
  children: React.ReactNode;
}

const ExpensesContextProvider: React.FC<ExpensesProviderProps> = ({ children }) => {
  // SECTION: (1) USING STATE:
  //   const [expenses, setExpenses] = useState<Expense[]>([]);
  //   const addExpense = (expenseFields: EditableExpenseFields) => {
  //     setExpenses((current) => {
  //       return [...current, { ...expenseFields, id: `e${current.length + 1}` }];
  //     });
  //   };
  //   const removeExpense = (expenseId: string) => {
  //     setExpenses((current) => current.filter((expense) => expense.id !== expenseId));
  //   };
  //   const updateExpense = (expenseId: string, fields: EditableExpenseFields) => {
  //     setExpenses((current) => {
  //       const index = current.findIndex((exp) => exp.id === expenseId);
  //       if (index < 0) return current;
  //       //   const expenseToEdit = current.at(index)!;

  //       const updatedExpenses = [...current];
  //       updatedExpenses[index] = { ...updatedExpenses[index], ...fields };
  //       return updatedExpenses;
  //     });
  //   };

  //   SECTION: (2) Using useReducer:
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  const setExpenses = (expenses: Expense[]) => {
    dispatch({ type: "SET", payload: expenses });
  };
  const addExpense = (expenseData: Expense) => dispatch({ type: "ADD", payload: expenseData });
  const removeExpense = (expenseId: string) => dispatch({ type: "REMOVE", payload: { expenseId } });
  const updateExpense = (expenseId: string, expenseData: Partial<EditableExpenseFields>) =>
    dispatch({ type: "UPDATE", payload: { expenseId, expenseData } });

  return (
    <ExpensesContext.Provider
      value={{ expenses, setExpenses, addExpense, removeExpense, updateExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
