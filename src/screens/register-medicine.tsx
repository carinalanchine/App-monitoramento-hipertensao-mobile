import { Text, View, StyleSheet, ScrollView } from "react-native"
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
import { useToast } from "react-native-toast-notifications";
import { Loading } from "../components/loading";
import { useMedicines } from "../service/medicine.api";

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
  const { createMedicine } = useMedicines();
  const toast = useToast();

  const array = [{
    id: 1,
    nome: "Losartana"
  }, {
    id: 2,
    nome: 'bbbbbbb'
  }, {
    id: 3,
    nome: 'bbbbbbb'
  }, {
    id: 4,
    nome: 'bbbbbbb'
  }, {
    id: 5,
    nome: 'bbbbbbb'
  },]

  const titleContent = [
    'Nome do remédio',
    'Dosagem do remédio',
    'Frequência',
  ]

  const examplesContent = [
    'Losartana',
    '40 mg',
    '8 horas',
  ]

  const handleRegister = async () => {
    try {
      setLoading(true);
      await createMedicine(form);
      toast.show("Remédio cadastrado com sucesso", { type: "success" });
      navigation.goBack();
    } catch (error) {
      const message = `${error}`.split(": ")[1];
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  }

  const handleButton = () => {
    if ((step == 1 && !form?.title) || (step == 2 && !form?.dosage) || (step == 3 && !form?.interval)) {
      toast.show("Preencha todos os campos", { type: "danger" });
      return;
    }
    step == 3 ? handleRegister() : setStep(step + 1);
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
      <BackButton variant='secondary' onPress={() => step == 1 ? navigation.goBack() : setStep(step - 1)} />
      <SafeAreaView style={styles.container}>

        <StatusBarComponent variant="secondary" />
        <Loading status={loading}></Loading>

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
              placeholder={'ex: ' + examplesContent[step - 1]}
              blurOnSubmit={false}
              enterKeyHint={step < 3 ? "next" : "done"}
              autoFocus={true}
              onSubmitEditing={handleButton}
              value={handleInputValue()}
              onChangeText={(text) => handleInput(text)}
            >
            </Input>
          </View>

        </ScrollView >

        <View style={styles.button}>
          <Button size="full" variant="tertiary" onPress={handleButton}>
            <View style={styles.buttonContent}>
              <Text style={styles.textButton}>{step < 3 ? "Próximo" : "Concluir"}</Text>
            </View>
          </Button>
        </View>

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
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  textOptions: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
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
