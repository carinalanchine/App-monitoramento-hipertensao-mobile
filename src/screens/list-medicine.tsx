import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { fontSize } from "../theme/font-size";
import { fontFamily } from "../theme/font-family";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/stack.routes";
import { useState } from "react";
import { ModalComponent } from "../components/modal";
import { IMedicine } from "../interfaces/IMedicine";

type ListMedicineScreenProps = NativeStackScreenProps<RootStackParamList, 'listMedicine'>;

const ListMedicineScreen = ({ navigation }: ListMedicineScreenProps) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [medicineSelected, setMedicineSelected] = useState<IMedicine | undefined>();

  const medicines: IMedicine[] = [
    {
      id: "1",
      title: "Losartana",
      start: "22/01/2024",
      interval: "08 horas",
      dosage: "1 grama",
    },
    {
      id: "2",
      title: "Losartana",
      start: "22/03/2024",
      interval: "08 horas",
      dosage: "5 gramas",
    },
    {
      id: "3",
      title: "Losartana",
      start: "22/03/2024",
      interval: "08 horas",
      dosage: "5 gramas",
    },
    {
      id: "4",
      title: "Losartana",
      start: "22/03/2024",
      interval: "08 horas",
      dosage: "5 gramas",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>

      <ModalComponent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>

        <View style={stylesModal.modalContainer}>
          <View style={stylesModal.containerSecondary}>

            <Text style={stylesModal.title}>Excluir remédio</Text>

            <View style={stylesModal.textContainer}>
              <Text style={stylesModal.text}>Atenção, essa ação não pode ser revertida.</Text>
              <Text style={stylesModal.text}>Você tem certeza de que deseja excluir esse remédio?</Text>
            </View>

            <View style={stylesModal.containerButton}>
              <Button
                variant="destructive"
                size="full">
                <View style={styles.buttonContent}>
                  <Text style={styles.textButton}>Excluir</Text>
                </View>
              </Button>

              <Button
                variant="default"
                size="full"
                onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.buttonContent}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>

      </ModalComponent>

      <FlatList
        data={medicines}
        contentContainerStyle={{ gap: 1 }}
        renderItem={({ item }) => (

          <View style={styles.containerCard}>
            <Card variant="secondary">
              <View style={styles.contentCard}>
                <Text style={styles.textCard}>{item.title}</Text>
                <View>
                  <Text style={styles.textCard}>Intervalo: {item.interval}</Text>
                  <Text style={styles.textCard}>Dosagem: {item.dosage}</Text>
                </View>

                <Button
                  variant="destructive"
                  size="full"
                  onPress={() => { setMedicineSelected(item); setModalVisible(true) }}>
                  <View style={styles.buttonContent}>
                    <Text style={styles.textButton}>Excluir</Text>
                  </View>
                </Button>
              </View>
            </Card>
          </View>
        )}

        keyExtractor={(item) => item.id}
      />

      <View style={styles.iconButton}>
        <Button variant="remedio" size="md" onPress={() => navigation.navigate("registerMedicine")}>
          <View style={styles.buttonContent}>
            <Text style={styles.textButton}>novo remédio</Text>
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
    paddingTop: 20,
  },
  containerCard: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentCard: {
    gap: 20,
  },
  textCard: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
  },
  textButton: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
  },
  iconButton: {
    position: "absolute",
    bottom: 30,
    right: 30
  },
  buttonContent: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const stylesModal = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    paddingVertical: 40,
    marginHorizontal: 30,
    borderRadius: 8,
  },
  containerSecondary: {
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
  },
  textContainer: {
    gap: 10,
    paddingTop: 35,
    paddingBottom: 30,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.lg,
  },
  containerButton: {
    gap: 20,
  },
})

export default ListMedicineScreen;