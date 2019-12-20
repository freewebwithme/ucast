import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

export default function InfluencerCard({loading, error, data}) {

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...${error.message}</Text>;

  return (
    <View>
      <ScrollView horizontal={true}>
        {data.users.map(user => (
          <View key={user.id} style={styles.card}>
            <View style={styles.user}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                }}
              />
              <Text>{user.name}</Text>
              <Text>{user.userType}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  card: {
    padding: 5,
    borderColor: '#fff',
  },
});
