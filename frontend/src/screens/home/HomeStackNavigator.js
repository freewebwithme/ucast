import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './HomeScreen';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
