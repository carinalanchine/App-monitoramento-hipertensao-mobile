import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { fontSize } from "../theme/font-size";
import { fontFamily } from "../theme/font-family";

type ProgressStepProps = {
  number: string;
  status: boolean;
}

export const ProgressStep = (input: ProgressStepProps) => {
  const str = input.status ? 'true' : 'false';

  return (
    <View style={[[styles.numberBorder], statusStyles[str]]}>
      <Text style={styles.text}>{input.number}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  numberBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 75,
  },
  text: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.regular,
  },
  active: {
    backgroundColor: colors.tertiary,
  },
  notActive: {
    backgroundColor: colors.gray400,
  }
})

const statusStyles = {
  true: styles.active,
  false: styles.notActive,
}
