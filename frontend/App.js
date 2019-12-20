import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import client from './client';
import { ApolloProvider } from '@apollo/react-hooks'; 

export default function App () {
      return (
	<ApolloProvider client={client}>
	  <View style={styles.container}>
	    <AppNavigator />
	  </View>
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
