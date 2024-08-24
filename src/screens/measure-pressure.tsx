import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import Input from "../components/input";
import { useState } from "react";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import NumberPlease from 'react-native-number-please';
import WheelPicker from 'react-native-wheely';
import { Picker } from '@react-native-picker/picker';
import { format, subHours } from "date-fns";

type FormPressao = {
  date: string;
  hour: string;
  sistolica: string;
  diastolica: string;
}

const MeasurePressureScreen = () => {
  const [form, setForm] = useState<FormPressao | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>sistólica</Text>
          <Text style={styles.text}>diastólica</Text>
        </View>

      </ScrollView >
      <Button size="full" variant="pressao">
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
  text: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.regular,
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 100,
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