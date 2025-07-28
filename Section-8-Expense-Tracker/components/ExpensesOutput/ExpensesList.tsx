import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Expense } from "../../types";
import ExpenseItem from "./ExpenseItem";

interface ExpensesListProps {
  expenses: Expense[];
}

const renderExpenseItem: ListRenderItem<Expense> = (itemData) => {
  return <ExpenseItem expense={itemData.item} />;
};

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      style={{ marginTop: 2 }}
    />
  );
};

export default ExpensesList;
