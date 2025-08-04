import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  ExpensesOverviewTabs: undefined;
  ManageExpenseScreen: { expenseId: string } | undefined;
};

export type MainScreensTabParamList = {
  AllExpenses: undefined;
  RecentExpenses: undefined;
};

export type CompositeNavigationType = CompositeNavigationProp<
  BottomTabNavigationProp<MainScreensTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

// NOTE: Following are two ways to define Expense (with id), and EditableExpenseFields (without id)
// 1) Define EditableExpenseFields (w/o id), then define expense with interface "extends" or type &
// export type EditableExpenseFields = {
//   description: string;
//   amount: number;
//   date: Date;
// };

// export type Expense = { id: string } & EditableExpenseFields;
// OR: export interface Expense extends EditableExpenseFields {
//   id: string;
// }
// 2) Define Expense (with all fields), and use Omit<T> to define EditableExpenseFields:
export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export type EditableExpenseFields = Omit<Expense, "id">;
