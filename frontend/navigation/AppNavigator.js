import React from 'react';
import { createSwitchNavigator, createAppContainer} from 'react-navigation'; 
import tabNavigator from './MainTabNavigator';
import {LandingStack} from './AuthNavigator';
import { ActivityIndicator, StatusBar, View } from "react-native";
import * as SecureStore from "expo-secure-store";

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to
  // our appropriate place
  _bootstrapAsync = () => {

    // This will switch to the App screen or Auth screen and this
    // loading screen will be unmounted and thrown away.
    SecureStore.getItemAsync("userToken").then(token => {
      this.props.navigation.navigate(token ? "Main" : "Auth");
    })
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

