import { TouchableOpacity, Text } from "react-native";
import { StyleSheet, View } from "react-native"
import { colors } from "../theme/colors";
import { fontSize } from "../theme/font-size";
import { fontFamily } from "../theme/font-family";

type OptionButtonProps = {
  onPress?: () => void;
  text: string;
  status: boolean;
}

export const OptionButton = (input: OptionButtonProps) => {
  const str = input.status ? 'true' : 'false';

  return (
    <TouchableOpacity
      style={[[styles.button], statusStyles[str]]}
      onPress={input.onPress}>
      <View style={styles.buttonContent}>
        <Text style={styles.text}>{input.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
    borderRadius: 100,
  },
  text: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: colors.gray400,
    borderColor: colors.black,
    borderWidth: 1,
  },
  notSelected: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
})

const statusStyles = {
  true: styles.selected,
  false: styles.notSelected,
}