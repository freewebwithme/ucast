import React, { useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import globalStyles from "../../styles/Global";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Avatar, Button } from "react-native-paper";

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
      <View style={globalStyles.colContainer}>
        <Text style={styles.name}>{ data && data.me.name}</Text>
        <Avatar.Image size={72} source={{ uri: data.me.avatarUrl}} style={styles.avatar}/>
        <View style={globalStyles.rowContainer}>
          <Button style={styles.margin5Button} mode="contained">수정하기</Button>
          <Button style={styles.margin5Button} mode="contained">위시리스트</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  avatar: {
    margin: 20
  },
  margin5Button: {
    margin: 5
  },
});
