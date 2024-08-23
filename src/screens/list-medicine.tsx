import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { TabParamList } from "../routes/tab.routes";
import { fontSize } from "../theme/font-size";
import { fontFamily } from "../theme/font-family";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/stack.routes";

type ListMedicineScreenProps = NativeStackScreenProps<RootStackParamList, 'listMedicine'>;

const ListMedicineScreen = ({ navigation }: ListMedicineScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Remédios</Text>

      <ScrollView style={styles.containerCard}>
        <Card variant="secondary">
          <View style={styles.contentCard}>
            <Text style={styles.textCard}>Losartana</Text>
            <Text style={styles.textCard}>Começou: 22/01/2024</Text>
            <Text style={styles.textCard}>Intervalo: 8 horas</Text>
            <Text style={styles.textCard}>Dosagem: 1 grama</Text>

            <Button variant="destructive" size="full">
              <View style={styles.buttonContent}>
                <Text style={styles.textButton}>Excluir</Text>
              </View>
            </Button>
          </View>
        </Card>

      </ScrollView>
      <View style={styles.iconButton}>
        <Button variant="primary" size="icon" onPress={() => navigation.navigate("registerMedicine")}>
          <View style={styles.buttonContent}>
            <Ionicons name="add-outline" size={36} />
          </View>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: colors.secondary,
    paddingTop: 30,
  },
  subtitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.medium,
    color: colors.black,
    marginTop: 20,
    marginBottom: 20,
  },
  containerCard: {
    paddingTop: 10,
    gap: 30,
  },
  contentCard: {
    paddingTop: 10,
    gap: 20,
  },
  textCard: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    gap: 30,
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

export default ListMedicineScreen;