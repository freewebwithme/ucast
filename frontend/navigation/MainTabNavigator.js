import React from "react";
import { Platform, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import { Appbar } from "react-native-paper";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const config = Platform.select({
  web: { headerMode: "screen" },
  android: { headerMode: "none" },
  ios: { headerMode: "none" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      color={tintColor}
      name={
        Platform.OS === "ios"
          ? focused
            ? "ios-home"
            : "ios-home-outline"
          : "md-home"
      }
      size={25}
    />
  )
};

HomeStack.path = "";

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons color={tintColor} name="md-person" size={25} />
  )
};

ProfileStack.path = "";

const tabNavigator = createMaterialBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Profile: { screen: ProfileStack }
  },
  {
    initialRouteName: "Home"
  }
);

export default tabNavigator;
const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  }
});
