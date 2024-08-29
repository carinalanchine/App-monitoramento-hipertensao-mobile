import { StatusBar, StatusBarStyle } from "react-native";
import { colors } from "../theme/colors";

type StatusBarProps = {
  variant: "lightBlue" | "pink" | "tertiary" | "secondary";
}

export const StatusBarComponent = (input: StatusBarProps) => {
  const statusBarStyle: StatusBarStyle = 'dark-content';

  return (
    <StatusBar
      backgroundColor={colors[input.variant]}
      barStyle={statusBarStyle}
      translucent={true} />
  )
}
