import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home";
import NotificationsScreen from "../screens/notifications";
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Text, StyleSheet, View } from "react-native";
import { fontFamily } from "../theme/font-family";
import { fontSize } from "../theme/font-size";
import { colors } from "../theme/colors";

export type TabParamList = {
  home: undefined;
  notifications: undefined;
  homeStack: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

const nameRoutes = {
  home: "Home",
  notifications: "Alertas"
}

const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 90 }, tabBarLabel(props) {
          return <Text style={textTabStyles[String(props.focused)]}>{nameRoutes[props.children]}</Text>
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon(props) {
            return (
              <View style={iconContainerStyles[String(props.focused)]}>
                <Ionicons name="home-outline" size={24} style={iconTabStyles[String(props.focused)]} />
              </View>
            )
          },
        }}
        name="home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon(props) {
            return (
              <View style={iconContainerStyles[String(props.focused)]}>
                <SimpleLineIcons name="bell" size={22} style={iconTabStyles[String(props.focused)]} />
              </View>
            )
          },
        }}
        name="notifications"
        component={NotificationsScreen}
      />
    </Tab.Navigator>
  );
}

const textTabStyles = StyleSheet.create({
  false: {
    position: 'relative',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    textTransform: 'capitalize',
    top: -19
  },
  true: {
    position: 'relative',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    textTransform: 'capitalize',
    top: -19,
    color: colors.green900
  }
})

const iconTabStyles = StyleSheet.create({
  false: {
    color: colors.black
  },
  true: {
    position: 'absolute',
    color: colors.green900
  }
})

const iconContainerStyles = StyleSheet.create({
  false: {},
  true: {
    width: '100%',
    height: 67,
    paddingTop: 10,
    borderTopWidth: 4,
    borderTopColor: colors.green900,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TabRoutes;