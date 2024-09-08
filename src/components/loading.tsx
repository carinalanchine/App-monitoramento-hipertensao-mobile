import { ActivityIndicator } from "react-native"
import { ModalComponent } from "../components/modal";
import { colors } from "../theme/colors";

type LoadingProps = {
  status: boolean
}

export const Loading = (props: LoadingProps) => {
  return (
    <ModalComponent
      visible={props.status}>
      <ActivityIndicator size={60} color={colors.gray400} />
    </ModalComponent>
  )
}