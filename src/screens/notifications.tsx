import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
import Notification from "../components/notification";
import { Ionicons } from "@expo/vector-icons";
import { fontSize } from "../theme/font-size";
import { fontFamily } from "../theme/font-family";

const NotificationsScreen = () => {
  const notifications = [
    {
      id: "1",
      title: "Remédio",
      description: "Losartana - Terça • 10:20",
      icon: <Ionicons name="notifications-outline" size={24} />
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Alertas
      </Text>

      <FlatList
        data={notifications}
        contentContainerStyle={{
          gap: 5,
        }}
        renderItem={({ item }) => (
          <Notification
            description={item.description}
            icon={item.icon}
            title={item.title}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  title: {
    fontSize: fontSize["xl"],
    color: colors.black,
    fontFamily: fontFamily.medium,
    paddingHorizontal: 40,
    paddingVertical: 20
  }
});

export default NotificationsScreen;