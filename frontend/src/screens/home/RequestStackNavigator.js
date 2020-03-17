import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RequestScreen} from './RequestScreen';

const Stack = createStackNavigator();

export function RequestStack() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen
        name="RequestVideo"
        component={RequestScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
