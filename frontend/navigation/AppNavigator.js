import React from 'react';
import { createSwitchNavigator, createAppContainer} from 'react-navigation'; 
import tabNavigator from './MainTabNavigator';
import {LandingStack} from './AuthNavigator';
import { AsyncStorage, ActivityIndicator, StatusBar, View } from "react-native";


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to
  // our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("auth-token");

    // This will switch to the App screen or Auth screen and this
    // loading screen will be unmounted and thrown away.
    console.log("Printing userToken");
    console.log(userToken);

    this.props.navigation.navigate(userToken ? "Main" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: LandingStack,
    Main: tabNavigator,
  })
);
