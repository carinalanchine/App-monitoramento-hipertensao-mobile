import { View, StyleSheet, Text, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../routes/stack.routes";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import InitalImage from "../../assets/initial.png"
import { Image } from "react-native";
import { fontSize } from "../theme/font-size";
import { fontFamily } from "../theme/font-family";
import { Button } from "../components/button";

type InitialScreenProps = NativeStackScreenProps<RootStackParamList, 'initial'>;

const InitialScreen = ({ navigation }: InitialScreenProps) => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.containerImage}>
          <Image source={InitalImage} style={styles.image} />
        </View>

        <Text style={styles.title}>Olá, bem-vindo!</Text>

        <View style={styles.buttonsContainer}>
          <Button variant="primary" size="full" onPress={() => navigation.navigate("login")}>
            <View style={styles.buttonContent}>
              <Text style={styles.textButtonEntrar}>
                Entrar
              </Text>
            </View>
          </Button>

          <Button variant="outlinePrimary" size="full" onPress={() => navigation.navigate("register")}>
            <View style={styles.buttonContent}>
              <Text style={styles.textButtonCadastrar}>
                Cadastrar
              </Text>
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
    paddingHorizontal: 20,
  },
  image: {
    height: 366,
    width: 304,
    resizeMode: 'contain'
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  title: {
    textAlign: 'center',
    fontSize: fontSize.xl,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  buttonsContainer: {
    marginTop: 50,
    gap: 20,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%"
  },
  textButtonEntrar: {
    color: colors.white,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium
  },
  textButtonCadastrar: {
    color: colors.black,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium
  }
});

export default InitialScreen;