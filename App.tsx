import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium } from "@expo-google-fonts/poppins";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './src/routes/stack.routes';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from './src/store/authStore';
import { getAccessToken, getUser } from './src/util/storage';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const authStore = useAuthStore();
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium
  });

  useEffect(() => {
    const localSignIn = async () => {
      const token = await getAccessToken();
      if (token) {
        const user = await getUser();
        authStore.setSignIn(user, token);
      }
      return true;
    }

    const signIn = localSignIn();

    if (fontsLoaded && signIn)
      SplashScreen.hideAsync();

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
