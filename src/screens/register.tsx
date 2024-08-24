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

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'register'>;

type FormRegister = {
  nome: string;
  cpf: string;
  password: string;
  verifyPassword: string;
}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [form, setForm] = useState<FormRegister | null>(null);
  const toast = useToast();

  const handleRegister = () => {
    if (!form || !form.cpf || form.cpf.length < 14 || !form.password || !form.verifyPassword) {
      toast.show("Preencha todos os campos", {
        type: "danger",
      });

      return
    };

    if (!(form.password === form.verifyPassword)) {
      toast.show("As senhas precisam ser iguais", {
        type: "danger",
      });

      return
    }

    toast.show("Cadastro realizado com sucesso!", {
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
          <Image source={Logo} style={styles.image} />
        </View>

        <Text style={styles.title}>cadastro</Text>

        <View style={styles.containerInput}>
          <Input
            label="nome"
            placeholder="digite seu nome"
            onChangeText={(text) => setForm({ ...form, nome: text })}
          />
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
          <Input
            label="confirmar senha"
            placeholder="********"
            secureTextEntry
            value={form?.verifyPassword || ""}
            onChangeText={(text) => setForm({ ...form, verifyPassword: text })}
          />
        </View>
      </ScrollView>


      <View style={styles.buttonsContainer}>
        <Button variant="primary" size="full" onPress={handleRegister}>
          <View style={styles.buttonContent}>
            <Text style={styles.textButtonEntrar}>
              cadastrar
            </Text>
          </View>
        </Button>

        <Button variant="default" size="full" onPress={() => navigation.navigate("initial")}>
          <View style={styles.buttonContent}>
            <Text style={styles.textButtonVoltar}>
              voltar
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
    paddingHorizontal: 20,
    marginBottom: 20
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

export default RegisterScreen;