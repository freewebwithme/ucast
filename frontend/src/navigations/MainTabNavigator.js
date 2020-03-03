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

const getHeaderTitle = route => {
  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home';
  console.log('Printing route: ', route);
  switch (routeName) {
    case 'Home':
      return 'My Home';
    case 'Notification':
      return 'My Notification';
    case 'Profile':
      return 'My Profile';
  }
};

/* Hide bottom tab bar in child screen */
function tabBarToggle(route) {
  const routeIndex = route.state.index;
  console.log('Printing route index: ', routeIndex);
  switch (routeIndex) {
    case 0:
      return true;
    default:
      return false;
  }
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <BottomTabBar {...props} />}>
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
