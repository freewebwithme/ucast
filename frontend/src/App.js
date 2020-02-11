import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ApolloProvider} from '@apollo/react-hooks';
import client from './client';
import {enableScreens} from 'react-native-screens';
import {Provider as PaperProvider} from 'react-native-paper';
import CustomTheme from './styles/Theme';
import Config from 'react-native-config';
import {AppNavigator} from './navigations/AppNavigator';
import {GoogleSignin} from '@react-native-community/google-signin';

enableScreens();

GoogleSignin.configure({webClientId: Config.googleWebClientId});
console.log('Printing webClientId: ', Config.googleWebClientId);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={CustomTheme}>
        <AppNavigator />
      </PaperProvider>
    </ApolloProvider>
  );
}
