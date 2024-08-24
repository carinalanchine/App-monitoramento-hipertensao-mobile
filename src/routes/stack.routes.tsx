import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";
import TabRoutes from "./tab.routes";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/button";
import { AntDesign } from "@expo/vector-icons";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import TakeMedicineScreen from "../screens/take-medicine";
import MeasurePressureScreen from "../screens/measure-pressure";
import ListOfVideosScreen from "../screens/list-of-videos";
import ListMedicineScreen from "../screens/list-medicine";
import RegisterMedicineScreen from "../screens/register-medicine";
import InitialScreen from "../screens/inital";
import RegisterScreen from "../screens/register";
import HomeScreen from "../screens/home";
import { colors } from "../theme/colors";

export type RootStackParamList = {
  initial: undefined;
  login: undefined;
  register: undefined;
  main: undefined;
  takeMedicine: undefined;
  measurePressure: undefined;
  listOfVideos: undefined;
  listMedicine: undefined;
  registerMedicine: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="initial"
        component={InitialScreen}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen name="main" component={HomeScreen} />
      <Stack.Screen
        name="takeMedicine"
        component={TakeMedicineScreen}
        options={{
          headerShown: true,
          header(props) {
            return (
              <BackButton onPress={props.navigation.goBack} />
            );
          },
        }}
      />

      <Stack.Screen
        name="measurePressure"
        component={MeasurePressureScreen}
        options={{
          headerShown: true,
          header(props) {
            return (
              <>
                <BackButton variant="pressao" onPress={props.navigation.goBack} />
                <View style={style.subtitlePressao}>
                  <Text style={style.subtitle}>Medir pressão</Text>
                </View>
              </>
            );
          },
        }}
      />

      <Stack.Screen
        name="listOfVideos"
        component={ListOfVideosScreen}
        options={{
          headerShown: true,
          header(props) {
            return (
              <></>
            );
          },
        }}
      />

      <Stack.Screen
        name="listMedicine"
        component={ListMedicineScreen}
        options={{
          headerShown: true,
          header(props) {
            return (
              <>
                <BackButton variant="remedio" onPress={props.navigation.goBack} />
                <View style={style.subtitleRemedio}>
                  <Text style={style.subtitle}>Remédios</Text>
                </View>
              </>
            );
          },
        }}
      />

      <Stack.Screen
        name="registerMedicine"
        component={RegisterMedicineScreen}
        options={{
          headerShown: true,
          header(props) {
            return (
              <BackButton onPress={props.navigation.goBack} />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

const style = StyleSheet.create({
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
  subtitleRemedio: {
    backgroundColor: colors.tertiary,
    paddingBottom: 30,
  },
  subtitlePressao: {
    backgroundColor: colors.pink,
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    paddingTop: 20,
    paddingLeft: 25
  }
});


type BackButtonProps = {
  onPress: () => void;
  variant?: "dicas" | "pressao" | "remedio" | "secondary";
}

const BackButton = ({ onPress, variant = "secondary" }: BackButtonProps) => {
  return (
    <Button size="backButton" variant={variant} onPress={onPress}>
      <View style={style.header}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={style.text}>Voltar</Text>
      </View>
    </Button>
  );
};

export default StackRoutes;