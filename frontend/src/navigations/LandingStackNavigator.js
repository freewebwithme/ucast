import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LandingScreen} from '../screens/LandingScreen';
import {LogInScreen} from '../screens/LogInScreen';
import {SignUpStack} from '../screens/SignUpScreen';

const Stack = createStackNavigator();

export function LandingStack() {
  return (
    <Stack.Navigator initialRouteName="Landing" headerMode="none">
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="SignUp" component={SignUpStack} />
    </Stack.Navigator>
  );
}
