import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import AntDesign from '@expo/vector-icons/AntDesign';
import Input from "../components/input";
import { useState } from "react";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import { ProgressStep } from "../components/progress-step";
import { BackButton } from "../components/back-button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/stack.routes";
import { StatusBarComponent } from "../components/status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../store/userStore";
import { useToast } from "react-native-toast-notifications";
import { ModalComponent } from "../components/modal";
import { URL_BASE } from "../util/constants";

type RegisterMedicineScreenProps = NativeStackScreenProps<RootStackParamList, 'registerMedicine'>;

type FormMedicine = {
  title: string;
  dosage: string;
  interval: string;
}

const RegisterMedicineScreen = ({ navigation }: RegisterMedicineScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormMedicine | null>(null);
  const [step, setStep] = useState(1);
  const toast = useToast();
  const userStore = useUserStore();

  const titleContent = [
    'Nome do remédio',
    'Dosagem do remédio',
    'Frequência',
  ]

  const exContent = [
    'Losartana',
    '40 mg',
    '8 horas',
  ]

  const handleConcluir = async () => {
    if (!form?.interval) {
      toast.show("Preencha o intervalo do remédio", {
        type: "danger",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(URL_BASE + '/medicine', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userStore.token
        },
        body: JSON.stringify({
          title: form.title,
          dosage: form.dosage,
          interval: form.interval,
          patientId: userStore.user.id
        })
      });

      const json = await response.json();

      if (json.status !== "success")
        throw new Error(json.message);

      toast.show("Remédio cadastrado com sucesso", { type: "success" });
      navigation.navigate("listMedicines");
    } catch (error) {
      toast.show(`${error}`, { type: "danger" });
    } finally {
      setLoading(false);
    }
  }

  const handleProximo = () => {
    if (step == 1 && !form?.title) {
      toast.show("Preencha o nome do remédio", {
        type: "danger",
      });
      return;
    }

    if (step == 2 && !form?.dosage) {
      toast.show("Preencha a dosagem do remédio", {
        type: "danger",
      });
      return;
    }

    setStep(step + 1);
  }

  const handleBackButton = () => {
    if (step == 1)
      navigation.navigate("listMedicines");
    else
      setStep(step - 1);
  }

  const handleInput = (text: string) => {
    switch (step) {
      case 1:
        setForm({ ...form, title: text })
        break;
      case 2:
        setForm({ ...form, dosage: text })
        break;
      case 3:
        setForm({ ...form, interval: text })
        break;
    }
  }

  const handleInputValue = () => {
    switch (step) {
      case 1:
        return form?.title || ""

      case 2:
        return form?.dosage || ""

      case 3:
        return form?.interval || ""
    }
  }

  return (
    <>
      <BackButton variant='secondary' onPress={() => handleBackButton()} />
      <SafeAreaView style={styles.container}>

        <StatusBarComponent variant="secondary" />

        <ModalComponent
          visible={loading}
          onRequestClose={() => setLoading(!loading)}>
          <ActivityIndicator size={60} color={colors.gray400} />
        </ModalComponent>

        <ScrollView style={styles.content}>

          <View style={styles.steps}>
            <ProgressStep number='1' status={step >= 1}></ProgressStep>
            <AntDesign name="arrowright" size={25} color="black" />
            <ProgressStep number='2' status={step >= 2}></ProgressStep>
            <AntDesign name="arrowright" size={25} color="black" />
            <ProgressStep number='3' status={step >= 3}></ProgressStep>
          </View>

          <Text style={styles.text}>{titleContent[step - 1]}</Text>

          <View style={styles.inputContainer}>
            <Input
              placeholder={'ex: ' + exContent[step - 1]}
              value={handleInputValue()}
              onChangeText={(text) => handleInput(text)}
            >
            </Input>
          </View>

        </ScrollView >

        {step == 3 ?
          <View style={styles.button}>
            <Button size="full" variant="tertiary" onPress={handleConcluir}>
              <View style={styles.buttonContent}>
                <Text style={styles.textButton}>Concluir</Text>
              </View>
            </Button>
          </View> :
          <View style={styles.button}>
            <Button size="full" variant="tertiary" onPress={handleProximo}>
              <View style={styles.buttonContent}>
                <Text style={styles.textButton}>Próximo</Text>
              </View>
            </Button>
          </View>
        }

      </SafeAreaView >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingBottom: 20,
  },
  inputContainer: {
    paddingTop: 30,
  },
  text: {
    paddingLeft: 10,
    paddingTop: 30,
    fontFamily: fontFamily.regular,
    fontSize: fontSize["2xl"],
  },
  steps: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  textButton: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
  },
  button: {
    paddingHorizontal: 20,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
})

export default RegisterMedicineScreen;
