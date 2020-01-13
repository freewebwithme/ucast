import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import client from './client';
import { ApolloProvider } from '@apollo/react-hooks'; 
import { Provider as PaperProvider } from 'react-native-paper';
import CustomTheme from './constants/Theme';

export default function App () {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={CustomTheme}>
	<View style={styles.container}>
	  <AppNavigator />
	</View>
      </PaperProvider>
    </ApolloProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

AppRegistry.registerComponent('App', () => App());
