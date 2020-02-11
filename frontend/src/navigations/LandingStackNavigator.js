import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LandingScreen} from '../screens/LandingScreen';
import {LogInScreen} from '../screens/LogInScreen';
import {SignUpScreen} from '../screens/SignUpScreen';

const Stack = createStackNavigator();

export function LandingStack() {
  return (
    <Stack.Navigator initialRouteName="Landing" headerMode="none">
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
