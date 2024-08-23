import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/stack.routes";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'main'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Clique em uma das opções:</Text>

      <View style={styles.containerButtons}>
        <Button variant="primary" size="full" onPress={() => {
          navigation.navigate('takeMedicine');
        }}>
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons style={styles.iconButton} name="pill" size={24} color="black" />
            <Text style={styles.textButton}>Tomar remédio</Text>
          </View>
        </Button>

        <Button variant="primary" size="full" onPress={() => navigation.navigate("listMedicine")}>
          <View style={styles.buttonContent}>
            <AntDesign style={styles.iconButton} name="edit" size={24} color="black" />
            <Text style={styles.textButton}>Cadastrar remédio</Text>
          </View>
        </Button>

        <Button variant="primary" size="full" onPress={() => {
          navigation.navigate('measurePressure');
        }}>
          <View style={styles.buttonContent}>
            <Fontisto style={styles.iconButton} name="doctor" size={24} color="black" />
            <Text style={styles.textButton}>Medir pressão</Text>
          </View>
        </Button>

        <Button variant="primary" size="full" onPress={() => {
          navigation.navigate('listOfVideos');
        }}>
          <View style={styles.buttonContent}>
            <Fontisto style={styles.iconButton} name="youtube-play" size={20} color="black" />
            <Text style={styles.textButton}>Dicas</Text>
          </View>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: colors.secondary,
    paddingTop: 30,
  },
  containerButtons: {
    paddingTop: 10,
    gap: 30,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
  },
  textButton: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
  },
  iconButton: {
    transform: [{ translateX: -30 }],
  },
  buttonContent: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeScreen;