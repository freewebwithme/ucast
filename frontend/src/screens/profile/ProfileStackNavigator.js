import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from './ProfileScreen';
import {EditProfileScreen} from './EditProfileScreen';

const Stack = createStackNavigator();

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="none">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Edit" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
