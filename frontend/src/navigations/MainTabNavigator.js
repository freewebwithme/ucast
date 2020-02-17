import React from 'react';
import {SafeAreaView} from 'react-native';
import {HomeStack} from '../screens/home/HomeStackNavigator';
import {ProfileStack} from '../screens/profile/ProfileStackNavigator';
import {NotificationScreen} from '../screens/NotificationScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchIcon, PersonIcon, BellIcon} from '../styles/Icons';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';

const Tab = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => {
  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={onSelect}
        appearance="noIndicator">
        <BottomNavigationTab title="Home" icon={SearchIcon} />
        <BottomNavigationTab title="Notification" icon={BellIcon} />
        <BottomNavigationTab title="Profile" icon={PersonIcon} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
