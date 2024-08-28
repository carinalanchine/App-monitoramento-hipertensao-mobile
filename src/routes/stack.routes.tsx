import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";
import { StyleSheet, Text, View } from "react-native";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import TakeMedicineScreen from "../screens/take-medicine";
import MeasurePressureScreen from "../screens/measure-pressure";
import ListOfVideosScreen from "../screens/list-of-videos";
import ListMedicineScreen from "../screens/list-medicine";
import RegisterMedicineScreen from "../screens/register-medicine";
import InitialScreen from "../screens/initial";
import RegisterScreen from "../screens/register";
import HomeScreen from "../screens/home";
import { colors } from "../theme/colors";
import { BackButton } from "../components/back-button";

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
              <>
                <BackButton variant="dicas" onPress={props.navigation.goBack} />
                <View style={style.subtitleDicas}>
                  <Text style={style.subtitle}>Dicas</Text>
                </View>
              </>
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
              <></>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

const style = StyleSheet.create({
  subtitleRemedio: {
    backgroundColor: colors.tertiary,
    paddingBottom: 30,
  },
  subtitlePressao: {
    backgroundColor: colors.pink,
    paddingBottom: 30,
  },
  subtitleDicas: {
    backgroundColor: colors.lightBlue,
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    paddingTop: 20,
    paddingLeft: 25
  }
});

export default StackRoutes;