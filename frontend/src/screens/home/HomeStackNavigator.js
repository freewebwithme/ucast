import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './HomeScreen';
import {InfluencerScreen} from './InfluencerScreen';
import {InfluencerHeader} from '../../components/InfluencerHeader';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {BackIcon} from '../../styles/Icons';
import {HeartIcon} from '../../styles/Icons';
import {Button} from '@ui-kitten/components';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      style={{backgroundColor: 'yellow'}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InfluencerScreen"
        component={InfluencerScreen}
        options={{
          header: props => <InfluencerHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
