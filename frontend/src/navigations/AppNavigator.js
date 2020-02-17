import React from 'react';
import {storage} from '../utils/Storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../screens/SplashScreen';
import {LandingStack} from './LandingStackNavigator';
import {MainTabNavigator} from './MainTabNavigator';

const Stack = createStackNavigator();
export const UserTokenContext = React.createContext();

export function AppNavigator() {
  const [userToken, setUserToken] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const updateUserToken = setUserToken;
  console.log('Executing AppNavigator');

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      userToken = await storage.get('userToken');
      setUserToken(userToken);
      setLoading(false);
      console.log('Calling bootstrapAsync()');
      console.log('Printing userToken bootstrapAsync():', userToken);
    };
    bootstrapAsync();
  });

  return (
    <NavigationContainer>
      <UserTokenContext.Provider value={updateUserToken}>
        <Stack.Navigator headerMode="none">
          {loading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : userToken === null ? (
            <Stack.Screen name="Landing" component={LandingStack} />
          ) : (
            <Stack.Screen name="Home" component={MainTabNavigator} />
          )}
        </Stack.Navigator>
      </UserTokenContext.Provider>
    </NavigationContainer>
  );
}
