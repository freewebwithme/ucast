import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import client from './client';
import { ApolloProvider } from '@apollo/react-hooks'; 


export default class App extends Component {
  render() {
      return (
	<ApolloProvider client={client}>
	  <View style={styles.container}>
	    <AppNavigator />
	    <Text>Hello World </Text>
	  </View>
	</ApolloProvider>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
