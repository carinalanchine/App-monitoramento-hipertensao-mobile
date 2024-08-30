import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";
import { StyleSheet, Text, View } from "react-native";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
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
  measurePressure: undefined;
  listOfVideos: undefined;
  listMedicine: undefined;
  registerMedicine: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackRoutes = () => {

  /*const handleSignInStatus = async () => {
    const signIn = await getData('loggedUser');
    signIn === null ? setIsSignedIn(false) : setIsSignedIn(true);
  }

  useEffect(() => {
    handleSignInStatus();
  });*/

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

      <Stack.Screen
        name="main"
        component={HomeScreen}
      />

      <Stack.Screen
        name="measurePressure"
        component={MeasurePressureScreen}
        options={{
          headerShown: true,
          header(props) {
            return (
              <>
                <BackButton variant="pink" onPress={props.navigation.goBack} />
                <View style={styles.subtitlePressao}>
                  <Text style={styles.subtitle}>Medir pressão</Text>
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
                <BackButton variant="lightBlue" onPress={props.navigation.goBack} />
                <View style={styles.subtitleDicas}>
                  <Text style={styles.subtitle}>Dicas</Text>
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
                <BackButton variant="tertiary" onPress={props.navigation.goBack} />
                <View style={styles.subtitleRemedio}>
                  <Text style={styles.subtitle}>Remédios</Text>
                </View>
              </>
            );
          },
        }}
      />

      <Stack.Screen
        name="registerMedicine"
        component={RegisterMedicineScreen}
      />

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
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