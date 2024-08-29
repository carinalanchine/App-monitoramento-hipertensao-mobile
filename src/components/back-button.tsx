import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/button";
import { AntDesign } from "@expo/vector-icons";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";

type BackButtonProps = {
  onPress: () => void;
  variant: "lightBlue" | "pink" | "tertiary" | "secondary";
}

export const BackButton = (input: BackButtonProps) => {
  return (
    <Button size="backButton" variant={input.variant} onPress={input.onPress}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.text}>Voltar</Text>
      </View>
    </Button>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    height: "100%",
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
  },
})