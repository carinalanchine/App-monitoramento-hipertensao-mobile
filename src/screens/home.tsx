import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import { Image } from "react-native";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/stack.routes";
import Dicas from "../../assets/dicas.png";
import Remedio from "../../assets/remedio.png";
import Pressao from "../../assets/pressao.png";
import { StatusBarComponent } from "../components/status-bar";
import { useUserStore } from "../store/userStore";
import { ModalComponent } from "../components/modal";
import { useState } from "react";
import { deleteLogin } from "../util/storage";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "main">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const userStore = useUserStore();

  const handleLogout = async () => {
    await deleteLogin();
    userStore.setLogout();
  }

  return (
    <SafeAreaView style={styles.container}>

      <StatusBarComponent variant="secondary" />

      <ModalComponent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>

        <View style={stylesModal.modalContainer}>
          <View style={stylesModal.containerSecondary}>

            <Text style={stylesModal.title}>Sair</Text>

            <View style={stylesModal.textContainer}>
              <Text style={stylesModal.text}>Você tem certeza de que deseja sair?</Text>
            </View>

            <View style={stylesModal.containerButton}>
              <Button
                variant="destructive"
                size="full"
                onPress={handleLogout}>
                <View style={styles.buttonContentModal}>
                  <Text style={styles.textButtonModal}>Sair</Text>
                </View>
              </Button>

              <Button
                variant="default"
                size="full"
                onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.buttonContentModal}>
                  <Text style={styles.textButtonModal}>Cancelar</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>

      </ModalComponent>


      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>{'Olá, ' + userStore.user.name + '!'}</Text>
        <Text style={styles.text}>Serviços</Text>

        <View style={styles.containerButtons}>
          <Button variant="lightBlue" size="menuCard" onPress={() => navigation.navigate("listVideos")}>
            <View style={styles.buttonContent}>
              <Image source={Dicas} style={styles.image} />
              <Text style={styles.textButton}>Dicas</Text>
            </View>
          </Button>

          <Button variant="pink" size="menuCard" onPress={() => navigation.navigate("measurePressure")}>
            <View style={styles.buttonContent}>
              <Image source={Pressao} style={styles.image} />
              <Text style={styles.textButton}>Pressão</Text>
            </View>
          </Button>

          <Button variant="tertiary" size="menuCard" onPress={() => navigation.navigate("listMedicines")}>
            <View style={styles.buttonContent}>
              <Image source={Remedio} style={styles.image} />
              <Text style={styles.textButton}>Remédios</Text>
            </View>
          </Button>
        </View>

        <View style={styles.logoutButton}>
          <Button size="md" variant="secondary" onPress={() => setModalVisible(true)}>
            <View style={styles.headerLogout}>
              <SimpleLineIcons name="logout" size={24} color="black" />
              <Text style={styles.textLogout}>Sair</Text>
            </View>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  image: {
    height: 150,
    width: 200,
    resizeMode: 'contain'
  },
  containerButtons: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    gap: 20,
  },
  headerLogout: {
    alignItems: "center",
    height: "100%",
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
  },
  logoutButton: {
    paddingTop: 10,
    paddingBottom: 10
  },
  textLogout: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize["2xl"],
    paddingBottom: 30,
    paddingTop: 20,
    paddingLeft: 15
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
    paddingLeft: 15,
  },
  textButton: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
  },
  buttonContent: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  textButtonModal: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
  },
  buttonContentModal: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const stylesModal = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    paddingVertical: 40,
    marginHorizontal: 30,
    borderRadius: 8,
  },
  containerSecondary: {
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
  },
  textContainer: {
    gap: 10,
    paddingTop: 20,
    paddingBottom: 30,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.lg,
  },
  containerButton: {
    gap: 20,
  },
})

export default HomeScreen;