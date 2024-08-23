import { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../routes/stack.routes";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Logo from "../../assets/logo.png"
import { Image } from "react-native";
import { fontSize } from "../theme/font-size";
import { fontFamily } from "../theme/font-family";
import Input from "../components/input";
import { Button } from "../components/button";
import { useToast } from "react-native-toast-notifications";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'login'>;

type FormLogin = {
  cpf: string;
  password: string;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [form, setForm] = useState<FormLogin | null>(null);
  const toast = useToast();

  const handleLogin = () => {
    if (!form || !form.cpf || form.cpf.length < 14 || !form.password) {
      toast.show("Preencha todos os campos", {
        type: "danger",
      });

      return
    };

    console.log("aaa", form);
    toast.show("Login realizado com sucesso!", {
      type: "success",
    });
    navigation.navigate("main");
  };

  const maskCpf = (value: string) => {
    setForm({
      ...form,
      cpf: value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.containerImage}>
          <Image source={Logo} />
        </View>

        <Text style={styles.title}>Login</Text>

        <View style={styles.containerInput}>
          <Input
            label="Cpf"
            placeholder="digite seu cpf"
            value={form?.cpf || ""}
            onChangeText={(text) => maskCpf(text)}
          />
          <Input
            label="Senha"
            placeholder="********"
            secureTextEntry
            value={form?.password || ""}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
        </View>
      </ScrollView>

      <Button variant="primary" size="full" onPress={handleLogin}>
        <View style={styles.buttonContent}>
          <Text style={styles.textButton}>
            Entrar
          </Text>
        </View>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  title: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.medium,
    color: colors.black,
    marginTop: 40
  },
  containerInput: {
    marginTop: 40,
    gap: 20
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%"
  },
  textButton: {
    color: colors.white,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium
  }
});

export default LoginScreen;