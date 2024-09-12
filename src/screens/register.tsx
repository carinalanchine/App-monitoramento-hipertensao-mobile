import { useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
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
import { Loading } from "../components/loading";
import { usePatient } from "../service/patient.api";

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, "register">;

type FormRegister = {
  nome: string;
  cpf: string;
  password: string;
  verifyPassword: string;
}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormRegister | null>(null);
  const { createPatient } = usePatient();
  const toast = useToast();

  const cpfRef = useRef<TextInput | null>();
  const passwordRef = useRef<TextInput | null>();
  const verifyPasswordRef = useRef<TextInput | null>();

  const handleRegister = async () => {
    if (!form || !form.cpf || form.cpf.length < 14 || !form.password || !form.verifyPassword) {
      toast.show("Preencha todos os campos", {
        type: "danger",
      });
      return
    };

    if (form.password !== form.verifyPassword) {
      toast.show("As senhas precisam ser iguais", {
        type: "danger",
      });
      return
    }

    try {
      setLoading(true);
      await createPatient(form);
      toast.show("Cadastro realizado com sucesso", { type: "success" });
      navigation.navigate("login");
    } catch (error) {
      const message = `${error}`.split(": ")[1];
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  }

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
      <Loading status={loading}></Loading>

      <ScrollView style={styles.scroll}>
        <View style={styles.containerImage}>
          <Image source={Logo} style={styles.image} />
        </View>

        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.containerInput}>
          <Input
            label="nome"
            autoCapitalize="words"
            blurOnSubmit={false}
            enterKeyHint="next"
            onSubmitEditing={() => { cpfRef.current.focus() }}
            placeholder="digite seu nome"
            onChangeText={(text) => setForm({ ...form, nome: text })}
          />
          <Input
            ref={cpfRef}
            blurOnSubmit={false}
            enterKeyHint="next"
            onSubmitEditing={() => { passwordRef.current.focus() }}
            label="cpf"
            placeholder="111.111.111-11"
            valueType="numeric"
            value={form?.cpf || ""}
            onChangeText={(text) => maskCpf(text)}
          />
          <Input
            ref={passwordRef}
            enterKeyHint="next"
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            onSubmitEditing={() => { verifyPasswordRef.current.focus() }}
            label="senha"
            placeholder="********"
            secureTextEntry
            value={form?.password || ""}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <Input
            ref={verifyPasswordRef}
            autoCapitalize="none"
            autoCorrect={false}
            label="confirmar senha"
            placeholder="********"
            secureTextEntry
            value={form?.verifyPassword || ""}
            onSubmitEditing={handleRegister}
            onChangeText={(text) => setForm({ ...form, verifyPassword: text })}
          />
        </View>
      </ScrollView>


      <View style={styles.buttonsContainer}>
        <Button variant="primary" size="full" onPress={handleRegister}>
          <View style={styles.buttonContent}>
            <Text style={styles.textButtonEntrar}>
              Cadastrar
            </Text>
          </View>
        </Button>

        <Button variant="default" size="full" onPress={() => navigation.goBack()}>
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
  },
  scroll: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10
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