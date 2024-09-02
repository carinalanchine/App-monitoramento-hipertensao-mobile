import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium } from "@expo-google-fonts/poppins";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './src/routes/stack.routes';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getObject } from './src/util/storage';
import { useUserStore } from './src/store/userStore';
import { IUser } from './src/interfaces/IUser';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const userStore = useUserStore();
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium
  });

  useEffect(() => {
    const checkToken = async () => {
      const isSignedUp = await getObject("isSignedUp");

      if (isSignedUp === 'true') {
        const user = await getObject("user");
        const token = await getObject("token");
        userStore.setLoggedUser(user, token);
      }
    }

    checkToken();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <ToastProvider >
          <StackRoutes />
        </ToastProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
