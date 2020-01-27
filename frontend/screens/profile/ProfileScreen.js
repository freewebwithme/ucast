import React, { useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import globalStyles from "../../styles/Global";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Avatar } from "react-native-paper";

const GET_USER_INFO = gql `
query {
  me {
    name
    avatarUrl
    email
    intro
  }
}
`;

export default function ProfileScreen(props) {
  const { loading, error, data } = useQuery(GET_USER_INFO);

    if (error) return <Text>{error.message}</Text>; 
    if (loading) return <Text>Loading...</Text>;

  return (
    <View style={globalStyles.container}>
      <Text> Hello world</Text>
      <Text>{ data && data.me.name}</Text>
      <Avatar.Image size={48} source={data.me.avatarUrl}/>
    </View>
  );
}

const styles = StyleSheet.create({
    
});
