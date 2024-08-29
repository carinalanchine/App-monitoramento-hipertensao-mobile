import { StyleSheet, View } from "react-native"
import { colors } from "../theme/colors"
import { ReactNode } from "react"

type CardProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Card = ({ children, variant = 'primary' }: CardProps) => {
  const variantStyles = {
    primary: styles.primary,
    secondary: styles.secondary
  }

  return (
    <View style={variantStyles[variant]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  primary: {
    width: '100%',
    height: 'auto',
    padding: 30,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8
  },
  secondary: {
    width: '100%',
    height: 'auto',
    padding: 30,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 4
  }
})