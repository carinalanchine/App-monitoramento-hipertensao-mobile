import { Text, View, StyleSheet, ScrollView } from "react-native"
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import { useEffect, useState } from "react";
import { colors } from "../theme/colors";
import { Button } from "../components/button";
import { StatusBarComponent } from "../components/status-bar";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import React from "react";
import { URL_BASE } from "../util/constants";
import { useUserStore } from "../store/userStore";
import { useToast } from "react-native-toast-notifications";

type FormPressao = {
  sistolica: number;
  diastolica: number;
}

const MeasurePressureScreen = () => {
  const [form, setForm] = useState<FormPressao | null>({ sistolica: 20, diastolica: 20 });
  const dadosPicker = [...Array(50).keys()]
  const userStore = useUserStore();
  const toast = useToast();

  const handleSalvar = () => {
    registerPressure();
  }

  const registerPressure = async () => {
    try {
      const response = await fetch(URL_BASE + '/pressure', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userStore.token
        },
        body: JSON.stringify({
          systolic: form.sistolica,
          diastolic: form.diastolica,
          patientId: userStore.user.id
        })
      });

      const json = await response.json();

      if (json.status === "success") {
        toast.show("Pressão salva", {
          type: "success",
        });
      }

      else {
        throw new Error('Erro ao salvar pressão');
      }

    } catch (error) {
      console.error(error);
      toast.show("Erro ao salvar pressão", {
        type: "danger",
      });
    }
  };

  return (
    <View style={styles.container}>

      <StatusBarComponent variant="pink" />

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
        <Button size="full" variant="pink" onPress={() => handleSalvar()}>
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
    fontSize: 80,
    fontFamily: fontFamily.regular,
    color: colors.gray400
  },
  activePicker: {
    fontSize: 80,
    fontFamily: fontFamily.regular,
    color: colors.red600
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  header: {
    marginTop: '15%',
    marginLeft: 30,
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