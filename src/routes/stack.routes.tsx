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
      <Stack.Screen name="main" component={TabRoutes} />
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
              <BackButton onPress={props.navigation.goBack} />
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
              <BackButton onPress={props.navigation.goBack} />
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
              <BackButton onPress={props.navigation.goBack} />
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
  }
});


type BackButtonProps = {
  onPress: () => void;
}

const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <Button size="full" variant="secondary" onPress={onPress}>
      <View style={style.header}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={style.text}>Voltar</Text>
      </View>
    </Button>
  );
};

export default StackRoutes;