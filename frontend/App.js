import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import client from './client';
import { ApolloProvider } from '@apollo/react-hooks'; 
import { Provider as PaperProvider } from 'react-native-paper';

export default function App () {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
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
