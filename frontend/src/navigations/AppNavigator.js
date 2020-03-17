import React from 'react';
import {storage} from '../utils/Storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../screens/SplashScreen';
import {LandingStack} from './LandingStackNavigator';
import {MainTabNavigator} from './MainTabNavigator';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

export function AppNavigator() {
  console.log('Executing AppNavigator');

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };

        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isSignout: false,
          };

        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await storage.get('userToken');
      } catch (e) {
        console.log('Getting userToken from storage error: ', e.message);
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
      console.log('Calling bootstrapAsync()');
      console.log('Printing userToken bootstrapAsync():', userToken);
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signOut: async () => {
        await storage.remove('userToken');
        dispatch({type: 'SIGN_OUT'});
      },
      signIn: async token => {
        await storage.set('userToken', token);
        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    [],
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator headerMode="none">
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken === null ? (
            <Stack.Screen name="Landing" component={LandingStack} />
          ) : (
            <Stack.Screen name="Home" component={MainTabNavigator} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
