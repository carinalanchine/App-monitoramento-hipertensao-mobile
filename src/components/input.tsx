import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import React from "react";

type InputProps = {
  label?: string;
  value?: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  enterKeyHint?: "next" | "done" | "enter" | "send" | "search" | "previous";
  autoFocus?: boolean
  secureTextEntry?: boolean;
  editable?: boolean;
  helperText?: string;
  defaultValue?: string;
  valueType?: KeyboardTypeOptions;
  blurOnSubmit?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(({ ...inputProps }, ref) => {
  return (
    <View>
      <TextInput
        ref={ref}
        style={styles.input}
        blurOnSubmit={inputProps.blurOnSubmit}
        autoFocus={inputProps.autoFocus}
        keyboardType={inputProps.valueType}
        onChangeText={inputProps.onChangeText}
        placeholder={inputProps.placeholder}
        value={inputProps.value}
        enterKeyHint={inputProps.enterKeyHint}
        secureTextEntry={inputProps.secureTextEntry}
        editable={inputProps.editable}
        defaultValue={inputProps.defaultValue}
        onSubmitEditing={inputProps.onSubmitEditing}
      />
      <Text style={styles.label}>{inputProps.label}</Text>
      {inputProps.helperText && (
        <Text style={styles.helperText}>{inputProps.helperText}</Text>
      )}
    </View>
  );
})

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
    top: -85,
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






