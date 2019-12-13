import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


const GET_USERS_QUERY = gql`
  query {
    users {
      name
      email
      id
      userType
    }
  }
`;


export default function HomeScreen(){
  const { loading, error, data } = useQuery(GET_USERS_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <View>
      <SearchBar placeholder="Type Here" />
      <ScrollView>
	<ScrollView horizontal={true}>
	  { data.users.map(user => (
	      <View key={user.id} style={styles.container}>
		<Text>{user.name}</Text>
		<Text>{user.email}</Text>
		<Text>{user.userType}</Text>
	      </View>
	  ))}
	</ScrollView>
      </ScrollView>
    </View>
  );
}
