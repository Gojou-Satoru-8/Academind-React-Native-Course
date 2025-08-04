import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  //   KeyboardTypeOptions,
  TextInputProps,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

const styles = StyleSheet.create({
  inputContainer: { marginHorizontal: 4, marginVertical: 10 },
  label: { fontSize: 12, color: GlobalStyles.colors.primary100, marginBottom: 4 },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top", // andrioid-specific
    // By default in multiline text-inputs, the text is aligned to the top in iOS, but center in
    // android, thus textAlignVertical: "top" solves that.
  },
  invalidLabel: { color: GlobalStyles.colors.error500 },
  invalidInput: { backgroundColor: GlobalStyles.colors.error50 },
});

interface InputProps {
  label: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  invalid?: boolean;
  // Two ways to type the textInputConfig properties:
  // (1) List the properties manually with their individual types:
  //   textInputConfig: {
  //     keyboardType: KeyboardTypeOptions;
  //   };
  //  (2) Import the whole TextInputProps interface, and pick the desired properties
  textInputConfig?: Pick<
    TextInputProps,
    | "value"
    | "keyboardType"
    | "maxLength"
    | "onChangeText"
    | "placeholder"
    | "multiline"
    | "autoCorrect" // autoCorrect by default is true
    | "autoCapitalize" // default value is "sentences" (capitalizes first letter of each sentence)
  >;
}

const Input: React.FC<InputProps> = ({ label, style, invalid, textInputConfig }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          textInputConfig?.multiline && styles.inputMultiline,
          invalid && styles.invalidInput,
        ]}
        {...textInputConfig}
      />
    </View>
  );
};

export default Input;
