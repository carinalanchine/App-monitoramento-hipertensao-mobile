import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import { Image } from "react-native";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/stack.routes";
import Dicas from "../../assets/dicas.png";
import Remedio from "../../assets/remedio.png";
import Pressao from "../../assets/pressao.png";
import { StatusBarComponent } from "../components/status-bar";
import { useUserStore } from "../store/userStore";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'main'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const user = useUserStore().user.name;

  return (
    <SafeAreaView style={styles.container}>

      <StatusBarComponent variant="secondary" />

      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>{'Olá, ' + user + '!'}</Text>
        <Text style={styles.text}>Serviços</Text>

        <View style={styles.containerButtons}>
          <Button variant="lightBlue" size="menuCard" onPress={() => navigation.navigate("listOfVideos")}>
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

          <Button variant="tertiary" size="menuCard" onPress={() => navigation.navigate("listMedicine")}>
            <View style={styles.buttonContent}>
              <Image source={Remedio} style={styles.image} />
              <Text style={styles.textButton}>Remédios</Text>
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
})

export default HomeScreen;