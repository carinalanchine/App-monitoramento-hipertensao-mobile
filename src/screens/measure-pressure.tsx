import { Text, View, StyleSheet, ScrollView } from "react-native"
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import { useState } from "react";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import { StatusBarComponent } from "../components/status-bar";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import React from "react";
import { useToast } from "react-native-toast-notifications";
import { Loading } from "../components/loading";
import { usePressure } from "../service/blood-pressure.api";

type FormPressao = {
  sistolica: number;
  diastolica: number;
}

const MeasurePressureScreen = () => {
  const [form, setForm] = useState<FormPressao | null>({ sistolica: 20, diastolica: 20 });
  const [loading, setLoading] = useState(false);
  const { createBloodPressure } = usePressure();
  const dadosPicker = [...Array(50).keys()]
  const toast = useToast();

  const handleSalvar = async () => {
    setLoading(true);
    try {
      await createBloodPressure(form);
      toast.show("Pressão salva com sucesso", { type: "success" });
    } catch (error) {
      toast.show(`${error}`, { type: "danger" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>

      <StatusBarComponent variant="pink" />
      <Loading status={loading}></Loading>

      <ScrollView style={styles.content}>

        <View style={styles.textContainer}>
          <Text style={styles.text}>sistólica</Text>
          <Text style={styles.text}>diastólica</Text>
        </View>

        <View style={styles.pickerContainer}>

          <ScrollPicker
            dataSource={dadosPicker}
            selectedIndex={20}
            activeItemTextStyle={styles.activePicker}
            wrapperHeight={390}
            itemHeight={78}
            wrapperBackground={colors.secondary}
            highlightBorderWidth={0}
            itemTextStyle={styles.picker}
            onValueChange={(data) => setForm({ ...form, sistolica: data })}
          />

          <ScrollPicker
            dataSource={dadosPicker}
            selectedIndex={20}
            activeItemTextStyle={styles.activePicker}
            wrapperHeight={390}
            itemHeight={78}
            wrapperBackground={colors.secondary}
            highlightBorderWidth={0}
            itemTextStyle={styles.picker}
            onValueChange={(data) => setForm({ ...form, diastolica: data })}
          />

        </View>

      </ScrollView >

      <View style={styles.buttonContainer}>
        <Button size="full" variant="pink" onPress={handleSalvar}>
          <View style={styles.buttonContent}>
            <Text style={styles.textButton}>Salvar</Text>
          </View>
        </Button>
      </View>


    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingBottom: 20
  },
  pickerContainer: {
    paddingTop: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 80,
  },
  picker: {
    fontSize: fontSize["4xl"],
    fontFamily: fontFamily.regular,
    color: colors.gray400
  },
  activePicker: {
    fontSize: fontSize["4xl"],
    fontFamily: fontFamily.regular,
    color: colors.red600
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.regular,
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 100,
  },
  textButton: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

export default MeasurePressureScreen;