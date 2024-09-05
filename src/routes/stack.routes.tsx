import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";
import { StyleSheet, Text, View } from "react-native";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import MeasurePressureScreen from "../screens/measure-pressure";
import ListVideosScreen from "../screens/list-videos";
import ListMedicinesScreen from "../screens/list-medicines";
import RegisterMedicineScreen from "../screens/register-medicine";
import InitialScreen from "../screens/initial";
import RegisterScreen from "../screens/register";
import HomeScreen from "../screens/home";
import { colors } from "../theme/colors";
import { BackButton } from "../components/back-button";
import { useUserStore } from "../store/userStore";

export type RootStackParamList = {
  initial: undefined;
  login: undefined;
  register: undefined;
  main: undefined;
  measurePressure: undefined;
  listVideos: undefined;
  listMedicines: undefined;
  registerMedicine: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackRoutes = () => {
  const isSignedIn = useUserStore().signedIn;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >

      {!isSignedIn ? (
        <>
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
        </>
      ) : (
        <>
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
            name="listVideos"
            component={ListVideosScreen}
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
            name="listMedicines"
            component={ListMedicinesScreen}
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
        </>
      )}

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