import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from "../theme/colors";

type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  variant: "primary" | "destructive" | "default" |
  "lightBlue" | "pink" | "tertiary" | "outline" | "secondary";
  size: "full" | "md" | "menuCard" | "backButton";
}

export const Button = (input: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={input.onPress}
      style={[variantStyles[input.variant], sizeStyles[input.size],]}>

      {input.children}
    </TouchableOpacity>
  )
}

const stylesVariant = StyleSheet.create({
  lightBlue: {
    backgroundColor: colors.lightBlue
  },
  tertiary: {
    backgroundColor: colors.tertiary,
  },
  pink: {
    backgroundColor: colors.pink
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary
  },
  destructive: {
    backgroundColor: colors.red300,
  },
  default: {
    backgroundColor: colors.gray400,
  },
  outline: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
  },
})

const stylesSize = StyleSheet.create({
  full: {
    width: '100%',
    height: 48,
    borderRadius: 100,
  },
  md: {
    width: 135,
    height: 48,
    borderRadius: 100,
  },
  menu: {
    width: 300,
    height: 200,
    borderRadius: 15
  },
  backButton: {
    width: '100%',
    height: 48,
  },
})

const variantStyles = {
  primary: stylesVariant.primary,
  destructive: stylesVariant.destructive,
  default: stylesVariant.default,
  outline: stylesVariant.outline,
  tertiary: stylesVariant.tertiary,
  secondary: stylesVariant.secondary,
  lightBlue: stylesVariant.lightBlue,
  pink: stylesVariant.pink,
}

const sizeStyles = {
  full: stylesSize.full,
  md: stylesSize.md,
  menuCard: stylesSize.menu,
  backButton: stylesSize.backButton,
}