import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from './ProfileScreen';

const Stack = createStackNavigator();

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="none">
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
