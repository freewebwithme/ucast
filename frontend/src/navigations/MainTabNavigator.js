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

/* Hide bottom tab bar in child screen */
//function tabBarToggle(route) {
//  const routeIndex = route.state.index;
//  console.log('Printing route index: ', routeIndex);
//  switch (routeIndex) {
//    case 0:
//      return true;
//    default:
//      return false;
//  }
//}

export function MainTabNavigator() {
  /* route.state may not exist for first app loading  */
  const checkRouteState = route => {
    if (route.state) {
      return route.state.index === 0 ? true : false;
    } else {
      return true;
    }
  };
  const tabBarToggle = route => {
    switch (route.name) {
      case 'Home':
        return checkRouteState(route);
      case 'Profile':
        return checkRouteState(route);
      case 'Notification':
        return checkRouteState(route);
      default:
        return false;
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <BottomTabBar {...props} />}
      tabBarOptions={{
        showLabel: 'false',
        showIcon: false,
        activeTintColor: 'blue',
      }}>
      <Tab.Screen
        name="Home"
        headerShown="false"
        component={HomeStack}
        options={({route}) => ({tabBarVisible: tabBarToggle(route)})}
      />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={({route}) => ({tabBarVisible: tabBarToggle(route)})}
      />
    </Tab.Navigator>
  );
}
