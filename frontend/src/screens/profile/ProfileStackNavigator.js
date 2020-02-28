import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from './ProfileScreen';
import {EditProfileScreen} from './EditProfileScreen';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditProfileScreen}
        options={{
          transitionSpec: {open: config, close: config},
          headerTitle: '내 정보 수정',
          headerStyle: {shadowColor: 'tomato'},
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyles: {},
});
