import { View, StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { fontSize } from "../theme/font-size";
import { fontFamily } from "../theme/font-family";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/stack.routes";
import React, { useState } from "react";
import { ModalComponent } from "../components/modal";
import { IMedicine } from "../interfaces/IMedicine";
import { StatusBarComponent } from "../components/status-bar";
import { useToast } from "react-native-toast-notifications";
import { useUserStore } from "../store/userStore";
import { URL_BASE } from "../util/constants";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "../components/loading";

type ListMedicineScreenProps = NativeStackScreenProps<RootStackParamList, 'listMedicines'>;

const ListMedicinesScreen = ({ navigation }: ListMedicineScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [medicineSelected, setMedicineSelected] = useState<IMedicine | undefined>();
  const [loading, setLoading] = useState(false);
  const [listMedicines, setListMedicines] = useState<IMedicine[]>(null);
  const [noMedicines, setNoMedicines] = useState(false);
  const toast = useToast();
  const userStore = useUserStore();

  useFocusEffect(
    React.useCallback(() => {
      getMedicines();
    }, [])
  )

  const getMedicines = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL_BASE + '/medicine/list/' + userStore.user.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userStore.token
        }
      });

      const json = await response.json();

      if (json.status !== "success")
        throw new Error(json.message);

      if (json.total > 0) {
        setListMedicines(json.medicines);
        setNoMedicines(false);
      }

      else
        setNoMedicines(true);
    } catch (error) {
      toast.show(`${error}`, { type: "danger" });
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL_BASE + '/medicine/' + medicineSelected.id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userStore.token
        }
      });

      const json = await response.json();

      if (json.status !== "success")
        throw new Error(json.message);

      await getMedicines();
      toast.show("Remédio deletado com sucesso", { type: "success" });
    } catch (error) {
      toast.show(`${error}`, { type: "danger" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <StatusBarComponent variant="tertiary" />
      <Loading status={loading}></Loading>

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
                size="full"
                onPress={() => { setModalVisible(!modalVisible); handleDelete() }}>
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

      {noMedicines ? (
        <>
          <View style={styles.containerCard}>
            <Card variant="secondary">
              <Text style={stylesModal.text}>Você ainda não possui remédios cadastrados!</Text>
            </Card>
          </View>
        </>
      ) : (
        <>
          <FlatList
            data={listMedicines}
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
        </>
      )}

      <View style={styles.iconButton}>
        <Button variant="tertiary" size="md" onPress={() => navigation.navigate("registerMedicine")}>
          <View style={styles.buttonContent}>
            <Text style={styles.textButton}>Novo remédio</Text>
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
    paddingTop: 10,
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
    fontFamily: fontFamily.regular,
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

export default ListMedicinesScreen;