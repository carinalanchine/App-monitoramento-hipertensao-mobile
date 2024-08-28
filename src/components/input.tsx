import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";

type InputProps = {
  label?: string;
  value?: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  editable?: boolean;
  helperText?: string;
  defaultValue?: string;
  valueType?: KeyboardTypeOptions;
}

const Input = ({ label, onChangeText, placeholder, valueType, value, secureTextEntry = false, editable, helperText, defaultValue }: InputProps) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        keyboardType={valueType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        editable={editable}
        defaultValue={defaultValue}
      />
      <Text style={styles.label}>{label}</Text>
      {helperText && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 56,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: fontSize.md,
    position: "relative",
    top: -78,
    marginLeft: -5,
    paddingHorizontal: 10,
    backgroundColor: colors.secondary,
    alignSelf: "flex-start",
    fontFamily: fontFamily.regular,
  },
  helperText: {
    marginTop: -20,
    paddingHorizontal: 20,
    color: colors.green900,
    fontSize: fontSize.md,
  }
});

export default Input;






