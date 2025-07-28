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

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};
