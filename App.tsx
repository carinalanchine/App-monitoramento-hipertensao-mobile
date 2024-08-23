import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './src/routes/stack.routes';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular, Roboto_500Medium, Roboto_700Bold
  });

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
