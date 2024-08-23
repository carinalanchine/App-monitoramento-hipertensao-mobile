import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import Input from "../components/input";
import { useState } from "react";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import { format, subHours } from "date-fns";

type FormMedicine = {
  name: string;
  color: string;
  initDate: string;
  initTime: string;
  interval: string;
  dosageType: string;
  dosage: string;
}

const RegisterMedicineScreen = () => {
  const [form, setForm] = useState<FormMedicine | null>(null);

  const maskDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1');
  };

  const maskHour = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1:$2')
      .replace(/(\d{2})\d+?$/, '$1');
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.textCadastrarRemedio}>Cadastrar remédio</Text>

        <View style={styles.containerInput}>
          <Input
            label="Nome"
            placeholder="Digite o nome do remédio"
            value={form?.name || ""}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          <Input
            label="Cor"
            placeholder="Digite a cor do remédio"
            value={form?.color || ""}
            onChangeText={(text) => setForm({ ...form, color: text })}
          />

          <Input
            label="Data inicial"
            placeholder="Digite quando começou o uso"
            helperText="dia/mês/ano"
            value={form?.initDate ?? undefined}
            defaultValue={format(new Date(), "dd/MM/yyyy")}
            onChangeText={(text) => setForm({ ...form, initDate: maskDate(text) })}
          />

          <Input
            label="Horário inicial"
            placeholder="Digite a hora de tomar o remédio"
            helperText="hora:minuto"
            value={form?.initTime ?? undefined}
            defaultValue={format(subHours(new Date(), 3), "HH:mm")}
            onChangeText={(text) => setForm({ ...form, initTime: maskHour(text) })}
          />

          <Input
            label="Intervalo"
            placeholder="Digite o intervalo do remédio"
            helperText="hora:minuto"
            value={form?.interval ?? undefined}
            defaultValue={format(subHours(new Date(), 3), "HH:mm")}
            onChangeText={(text) => setForm({ ...form, interval: maskHour(text) })}
          />

          <Input
            label="Tipo de dosagem"
            placeholder="Digite o tipo da dose"
            helperText="grama/miligrama"
            value={form?.dosageType || ""}
            onChangeText={(text) => setForm({ ...form, dosageType: text })}
          />

          <Input
            label="Dosagem"
            placeholder="Digite a dose"
            value={form?.dosage || ""}
            onChangeText={(text) => setForm({ ...form, dosage: text })}
          />

        </View>

      </ScrollView >

      <View style={styles.button}>
        <Button size="full" variant="primary">
          <View style={styles.buttonContent}>
            <Text>Salvar</Text>
          </View>
        </Button>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingBottom: 20
  },
  header: {
    marginTop: '15%',
    marginLeft: 30,
  },
  content: {
    marginTop: 30,
  },
  textCadastrarRemedio: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    marginBottom: 36,
    paddingHorizontal: 20,
  },
  containerInput: {
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 20
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