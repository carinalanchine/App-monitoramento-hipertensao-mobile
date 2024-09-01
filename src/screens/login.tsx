import { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { getData, storeData } from "../util/storage";
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
import { StatusBarComponent } from "../components/status-bar";
import { URL_BASE } from "../util/constants";
import { useUserStore } from "../store/userStore";
import { User } from "../interfaces/IUser";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'login'>;

type FormLogin = {
  cpf: string;
  password: string;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [form, setForm] = useState<FormLogin | null>(null);
  const toast = useToast();
  const userStore = useUserStore();

  const loginPatient = async () => {
    try {
      const response = await fetch(URL_BASE + '/login/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf: form.cpf,
          password: form.password
        })
      });

      const json = await response.json();

      if (json.status === 'success') {

        userStore.setLoggedUser(json.user, json.token);
        toast.show("Login realizado com sucesso!", {
          type: "success",
        });

        navigation.navigate("main");
      }

      else
        throw new Error();

    } catch (error) {
      toast.show("Erro ao realizar login", {
        type: "danger",
      });
    }
  };

  const handleLogin = () => {
    if (!form || !form.cpf || form.cpf.length < 14 || !form.password) {
      toast.show("Preencha todos os campos", {
        type: "danger",
      });

      return
    };

    loginPatient();
    //navigation.navigate("main");
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

      <StatusBarComponent variant="secondary" />

      <ScrollView style={styles.scroll}>
        <View style={styles.containerImage}>
          <Image source={Logo} style={styles.image} />
        </View>

        <Text style={styles.title}>Login</Text>

        <View style={styles.containerInput}>
          <Input
            label="cpf"
            placeholder="111.111.111-11"
            valueType="numeric"
            value={form?.cpf || ""}
            onChangeText={(text) => maskCpf(text)}
          />
          <Input
            label="senha"
            placeholder="********"
            secureTextEntry
            value={form?.password || ""}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
        </View>
      </ScrollView>


      <View style={styles.buttonsContainer}>
        <Button variant="primary" size="full" onPress={handleLogin}>
          <View style={styles.buttonContent}>
            <Text style={styles.textButtonEntrar}>
              Entrar
            </Text>
          </View>
        </Button>

        <Button variant="default" size="full" onPress={() => navigation.navigate("initial")}>
          <View style={styles.buttonContent}>
            <Text style={styles.textButtonVoltar}>
              Voltar
            </Text>
          </View>
        </Button>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    marginBottom: 20
  },
  scroll: {
    paddingHorizontal: 20,
    flex: 1,
  },
  image: {
    height: 142,
    width: 200,
    resizeMode: 'contain'
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  title: {
    textAlign: 'center',
    fontSize: fontSize.xl,
    fontFamily: fontFamily.medium,
    color: colors.black,
    marginTop: 50
  },
  containerInput: {
    marginTop: 40,
    gap: 20
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%"
  },
  textButtonEntrar: {
    color: colors.white,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium
  },
  textButtonVoltar: {
    color: colors.black,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium
  }
});

export default LoginScreen;