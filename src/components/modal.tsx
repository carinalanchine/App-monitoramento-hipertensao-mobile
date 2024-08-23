import { ReactNode } from "react";
import { StyleSheet, Modal, View } from 'react-native';
import { colors } from "../theme/colors";

type ModalProps = {
  children: ReactNode;
  visible: boolean;
  onRequestClose?: () => void;
}

export const ModalComponent = (input: ModalProps) => {
  return (
    <Modal
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade"
      onRequestClose={input.onRequestClose}
      visible={input.visible}>

      <View style={styles.container}>
        {input.children}
      </View>

    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backdrop,
    paddingBottom: 50,
  }
})