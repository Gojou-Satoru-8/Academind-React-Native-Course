import { Pressable, View, Text, StyleSheet } from "react-native";
import { Expense, RootStackParamList } from "../../types";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDateTime } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 6,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },

  textBase: { color: GlobalStyles.colors.primary50 },

  description: { fontSize: 16, marginBottom: 4, fontWeight: "bold" },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },

  amount: { color: GlobalStyles.colors.primary500, fontWeight: "bold" },

  pressed: { opacity: 0.75 },

  androidRipple: { color: GlobalStyles.colors.primary400 },
});

interface ExpenseItemProp {
  expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProp> = ({ expense }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const formattedDateTime = getFormattedDateTime(expense.date);
  const expensePressedHandler = () => {
    navigation.navigate("ManageExpenseScreen", { expenseId: expense.id });
  };
  return (
    <Pressable
      onPress={expensePressedHandler}
      style={({ pressed }) => [pressed && styles.pressed, styles.expenseItem]}
      android_ripple={styles.androidRipple}
    >
      <View>
        <Text style={[styles.textBase, styles.description]}>{expense.description}</Text>
        <Text style={[styles.textBase]}>{formattedDateTime}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{expense.amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;
