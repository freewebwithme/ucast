import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './HomeScreen';
import {InfluencerScreen} from './InfluencerScreen';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="InfluencerScreen" component={InfluencerScreen} />
    </Stack.Navigator>
  );
}
