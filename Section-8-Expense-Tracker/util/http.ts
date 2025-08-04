import axios from "axios";
import { EditableExpenseFields, Expense } from "../types";

const API_URL =
  "https://academind-rn-expense-app-default-rtdb.asia-southeast1.firebasedatabase.app";
// "https://api.openweathermap.org/geo/1.0";

enum FIREBASE_NODES {
  EXPENSES = "expenses",
}

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const storeExpense = async (expenseData: EditableExpenseFields) => {
  const response = await axiosInstance.post(`${FIREBASE_NODES.EXPENSES}.json`, expenseData);
  // OR: axios.post(API_URL + "/" + FIREBASE_NODES.EXPENSES, expenseData);
  // console.log("🚀 ~ storeExpense ~ response:", JSON.stringify(response, null, 2));
  // response.data has a name property which is the key of the newly created expense in Firebase
  return response.data.name; // (to be used as expense.id)
};

export const updateExpense = async (expenseId: string, expenseData: EditableExpenseFields) => {
  // .put or .patch both works
  const response = await axiosInstance.patch(
    `${FIREBASE_NODES.EXPENSES}/${expenseId}.json`,
    expenseData
  );
  console.log("🚀 ~ updateExpense ~ response:", JSON.stringify(response, null, 2));
  // response.date is all the fields (amount, date and description)
};

export const deleteExpense = async (expenseId: string) => {
  const response = await axiosInstance.delete(`${FIREBASE_NODES.EXPENSES}/${expenseId}.json`);
  console.log("🚀 ~ deleteExpense ~ response:", JSON.stringify(response, null, 2));
};

export const fetchExpenses = async () => {
  const response = await axiosInstance.get<Record<string, EditableExpenseFields>>(
    `${FIREBASE_NODES.EXPENSES}.json`
  );
  // console.log("🚀 ~ fetchExpenses ~ response:", JSON.stringify(response, null, 2));
  // Here, data will be in the form of Record<string, EditableExpenseFields>, ie will be an object
  // with string keys and values of EditableExpenseFields objects

  // const expenses: Expense[] = [];
  // for (const key in response.data) {
  //   // OR use Object.keys(response.data).forEach((key) => {...})
  //   const expense = {
  //     id: key,
  //     amount: response.data[key].amount,
  //     date: new Date(response.data[key].date),
  //     description: response.data[key].description,
  //   };
  //   expenses.push(expense);
  // }
  const expenses = Object.entries(response.data).map(([key, value]) => ({
    id: key, // key is a string
    amount: value.amount, // NOTE: value is of type EditableExpenseFields.
    date: new Date(value.date),
    description: value.description,
  }));
  console.log("🚀 ~ fetchExpenses ~ expenses:", expenses);
  return expenses;
};
