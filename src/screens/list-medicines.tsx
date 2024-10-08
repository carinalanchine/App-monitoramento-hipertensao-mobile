import { View, StyleSheet, Text, FlatList, RefreshControl } from "react-native";
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
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "../components/loading";
import { useMedicines } from "../service/medicine.api";

type ListMedicineScreenProps = NativeStackScreenProps<RootStackParamList, 'listMedicines'>;

const ListMedicinesScreen = ({ navigation }: ListMedicineScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [medicineSelected, setMedicineSelected] = useState<IMedicine | undefined>();
  const [loading, setLoading] = useState(false);
  const { listMedicines, deleteMedicine, getMedicines } = useMedicines();
  const toast = useToast();

  const getList = async () => {
    try {
      setLoading(true);
      await getMedicines();
    } catch (error) {
      const message = `${error}`.split(": ")[1];
      toast.show(message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getList();
    }, [])
  )

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteMedicine(medicineSelected.id);
      toast.show("Remédio excluído com sucesso", { type: "success" });
    } catch (error) {
      const message = `${error}`.split(": ")[1];
      toast.show(message, { type: "danger" });
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

      <FlatList
        refreshControl={<RefreshControl refreshing={false} onRefresh={getList} />}
        data={listMedicines}
        ListEmptyComponent={
          <View style={styles.containerCard}>
            <Card variant="secondary">
              <View style={styles.emptyCard}>
                <Text style={stylesModal.text}>Ainda não há remédios cadastrados</Text>
              </View>
            </Card>
          </View>
        }
        ListFooterComponent={<View style={styles.flatList}></View>}
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
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },
  emptyCard: {
    alignItems: 'center'
  },
  iconButton: {
    position: "absolute",
    bottom: 30,
    right: 30
  },
  flatList: {
    paddingTop: 80,
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