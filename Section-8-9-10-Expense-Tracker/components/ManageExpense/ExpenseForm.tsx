import { Alert, GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useCallback, useState } from "react";
import Button from "../ui/Button";
import { EditableExpenseFields, Expense } from "../../types";
import { GlobalStyles } from "../../constants/styles";

const styles = StyleSheet.create({
  form: { marginTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: { flexDirection: "row", justifyContent: "space-between" },
  rowInput: { flex: 1 },
  errorText: { textAlign: "center", color: GlobalStyles.colors.error500, margin: 8 },
  buttons: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  button: { minWidth: 120, marginHorizontal: 8 },
});

interface ExpenseFormProps {
  existingExpense: Expense | undefined;
  submitButtonLabel: string;
  onCancel: () => void;
  saveExpense: (expenseData: EditableExpenseFields) => void; // Function that saves to Context & DB
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  existingExpense,
  submitButtonLabel,
  onCancel,
  saveExpense,
}) => {
  const [formFields, setFormFields] = useState({
    amount: {
      // value: existingExpense ? existingExpense.amount.toString() : "",
      // isValid: existingExpense ? true : false,
      value: existingExpense?.amount.toString() || "",
      // isValid: !!existingExpense,
      isValid: true, // Set isValid to true on initial render as either there is an existing expense, which is valid, or empty input fields, which is valid initially
    },
    date: {
      // value: existingExpense ? existingExpense.date.toISOString().slice(0, 10) : "",
      // isValid: existingExpense ? true : false,
      value: existingExpense?.date.toISOString().slice(0, 10) || "",
      isValid: true,
    },
    // ISO FORMAT is: YYYY-MM-DDTHH:MM:SS.SSSZ
    description: {
      value: existingExpense?.description || "",
      isValid: true,
    },
  });
  console.log("🚀 ~ ExpenseForm ~ formFields:", formFields);

  //   const changeHandler = (fieldName: keyof typeof formFields, text: string) => {
  //     setFormFields((current) => ({ ...current, [fieldName]: text }));
  //   };
  const curriedChangeHandler = useCallback((fieldName: keyof typeof formFields) => {
    return (text: string) => {
      setFormFields((current) => ({
        ...current,
        [fieldName]: { value: text, isValid: true }, // Set isValid to true on-change to hide
        // previous errors, even if not valid. The check is later done on submitting.
      }));
    };
  }, []);

  const submitHandler = () => {
    const expenseData = {
      amount: +formFields.amount.value,
      date: RegExp("\\d{4}-\\d{2}-\\d{2}").test(formFields.date.value)
        ? new Date(formFields.date.value)
        : undefined,
      // Here, value is either undefined or InvalidDate or a valid date object.
      // Passing an invalid date format string to new Date() returns an InvalidDate object, on
      // which, calling .toString() method returns "Invalid Date" as a string.
      description: formFields.description.value.trim(),
    };
    console.log("🚀 ~ submitHandler ~ expenseData:", expenseData);
    // VALIDATION:
    const amountIsValid = !Number.isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = // First check undefined, and then check if date is valid
      expenseData.date !== undefined && expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // show feedback
      // Alert.alert("Invalid input", "Please check your input values");
      setFormFields((current) => ({
        amount: { value: current.amount.value, isValid: amountIsValid },
        date: { value: current.date.value, isValid: dateIsValid },
        description: { value: current.description.value, isValid: descriptionIsValid },
      }));
      return;
    }

    saveExpense(expenseData as EditableExpenseFields);
  };

  const formIsInvalid =
    // !formFields.amount.isValid || !formFields.date.isValid || !formFields.description.isValid;
    Object.values(formFields).some((field) => !field.isValid);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount"}
          style={styles.rowInput}
          invalid={!formFields.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            value: formFields.amount.value,
            // onChangeText: (text) => changeHandler("amount", text), // or (using bind:)
            // onChangeText: changeHandler.bind(null, "amount"),
            onChangeText: curriedChangeHandler("amount"),
          }}
        />
        <Input
          label={"Date"}
          style={styles.rowInput}
          invalid={!formFields.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: formFields.date.value,
            onChangeText: curriedChangeHandler("date"),
          }}
        />
      </View>
      <Input
        label={"Description"}
        invalid={!formFields.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false
          value: formFields.description.value,
          onChangeText: curriedChangeHandler("description"),
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
      )}
      <View style={styles.buttons}>
        <Button onPress={onCancel} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;
