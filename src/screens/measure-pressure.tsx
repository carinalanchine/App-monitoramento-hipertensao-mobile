import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import Input from "../components/input";
import { useState } from "react";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import { format, subHours } from "date-fns";

type FormPressao = {
  date: string;
  hour: string;
  higherPressure: string;
  LowerPressure: string;
}

const MeasurePressureScreen = () => {
  const [form, setForm] = useState<FormPressao | null>(null);

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
        <Text style={styles.textMedirPressao}>Medir pressão:</Text>

        <View style={styles.containerInput}>
          <Input
            label="Data"
            placeholder="Digite a data da medição"
            helperText="dia/mês/ano"
            value={form?.date ?? undefined}
            defaultValue={format(new Date(), "dd/MM/yyyy")}
            onChangeText={(text) => setForm({ ...form, date: maskDate(text) })}
          />

          <Input
            label="Hora"
            placeholder="Digite a hora de medição"
            helperText="hora:minuto"
            value={form?.hour ?? undefined}
            defaultValue={format(subHours(new Date(), 3), "HH:mm")}
            onChangeText={(text) => setForm({ ...form, hour: maskHour(text) })}
          />

          <Input
            label="Pressao Maior"
            placeholder="Digite a pressão maior"
            value={form?.higherPressure || ""}
            onChangeText={(text) => setForm({ ...form, higherPressure: text })}
          />

          <Input
            label="Pressao Menor"
            placeholder="Digite a pressão menor"
            value={form?.LowerPressure || ""}
            onChangeText={(text) => setForm({ ...form, LowerPressure: text })}
          />
        </View>

      </ScrollView >
      <Button size="full" variant="primary">
        <View style={styles.buttonContent}>
          <Text>Salvar</Text>
        </View>
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  header: {
    marginTop: '15%',
    marginLeft: 30,
  },
  content: {
    marginTop: 30,
  },
  textMedirPressao: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    marginBottom: 36
  },
  containerInput: {
    marginTop: 30,
    gap: 20
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

export default MeasurePressureScreen;