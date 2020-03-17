import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './HomeScreen';
import {InfluencerScreen} from './InfluencerScreen';
import {InfluencerHeader} from '../../components/InfluencerHeader';
import {RequestStack} from './RequestStackNavigator';
import {RequestScreen} from './RequestScreen';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Influencer"
        component={InfluencerScreen}
        options={{header: props => <InfluencerHeader {...props} />}}
      />
      <Stack.Screen
        name="RequestVideo"
        component={RequestScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
