import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  //   TextInputProps,
} from "react-native";
import { Colors } from "../../constants/styles";

interface InputProps {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  //   keyboardType: TextInputProps["keyboardType"]; // This returns keyboardType's type directly
  //   keyboardType: Pick<TextInputProps, "keyboardType">;  // This is incorrect because:
  // It returns an object-type with keyboardType as a key, not the keyboardType property's type
  // directly. That is, out of all properties defined inside TextInputProps, it picks keyboardType,
  // omits everything else and returns type as:
  // {keyboardType: KeyboardTypeOptions | undefined}
  secure?: boolean;
  onUpdateValue: (value: string) => void;
  value: string;
  isInvalid: boolean;
}

const Input: React.FC<InputProps> = function ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
