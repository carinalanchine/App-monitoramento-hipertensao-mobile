import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import { Image } from "react-native";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/stack.routes";
import Dicas from "../../assets/dicas.png";
import Remedio from "../../assets/remedio.png";
import Pressao from "../../assets/pressao.png";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'main'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Olá, Carina!</Text>
        <Text style={styles.text}>Serviços</Text>

        <View style={styles.containerButtons}>
          <Button variant="dicas" size="menuCard">
            <View style={styles.buttonContent}>
              <Image source={Dicas} style={styles.image} />
              <Text style={styles.textButton}>dicas</Text>
            </View>
          </Button>

          <Button variant="pressao" size="menuCard" onPress={() => navigation.navigate("measurePressure")}>
            <View style={styles.buttonContent}>
              <Image source={Pressao} style={styles.image} />
              <Text style={styles.textButton}>pressão</Text>
            </View>
          </Button>

          <Button variant="remedio" size="menuCard" onPress={() => navigation.navigate("listMedicine")}>
            <View style={styles.buttonContent}>
              <Image source={Remedio} style={styles.image} />
              <Text style={styles.textButton}>remédio</Text>
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
    paddingHorizontal: 20,
    backgroundColor: colors.secondary,
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
    paddingTop: 10,
    paddingLeft: 15
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
    paddingLeft: 15,
  },
  textButton: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.lg,
  },
  buttonContent: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
})

export default HomeScreen;