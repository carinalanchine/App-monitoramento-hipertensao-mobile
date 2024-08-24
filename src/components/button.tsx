import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from "../theme/colors";

type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  variant: "primary" | "destructive" | "outlinePrimary" |
  "outlineDestructive" | "default" | "secondary" |
  "dicas" | "pressao" | "remedio";
  size: "full" | "icon" | "md" | "menuCard" | "backButton";
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
  dicas: {
    backgroundColor: colors.lightBlue
  },
  remedio: {
    backgroundColor: colors.tertiary,
  },
  pressao: {
    backgroundColor: colors.pink
  },
  primary: {
    backgroundColor: colors.primary,
  },
  destructive: {
    backgroundColor: colors.red300,
  },
  default: {
    backgroundColor: colors.gray400,
  },
  outlinePrimary: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
  },
  outlineDestructive: {
    backgroundColor: colors.white,
    borderColor: colors.red600,
    borderWidth: 1,
  },
  secondary: {
    backgroundColor: colors.secondary,
  }
})

const stylesSize = StyleSheet.create({
  full: {
    width: '100%',
    height: 48,
    borderRadius: 100,
  },
  md: {
    width: 125,
    height: 48,
    borderRadius: 100,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 200,
  },
  menu: {
    width: 300,
    height: 200,
    borderRadius: 15
  },
  backButton: {
    width: '100%',
    height: 48,
  }
})

const variantStyles = {
  primary: stylesVariant.primary,
  destructive: stylesVariant.destructive,
  default: stylesVariant.default,
  outlinePrimary: stylesVariant.outlinePrimary,
  outlineDestructive: stylesVariant.outlineDestructive,
  secondary: stylesVariant.secondary,
  dicas: stylesVariant.dicas,
  remedio: stylesVariant.remedio,
  pressao: stylesVariant.pressao,
}

const sizeStyles = {
  full: stylesSize.full,
  md: stylesSize.md,
  icon: stylesSize.icon,
  menuCard: stylesSize.menu,
  backButton: stylesSize.backButton,
}