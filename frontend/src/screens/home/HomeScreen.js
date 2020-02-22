import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import globalStyles from '../../styles/Global';
import {Searchbar} from 'react-native-paper';
import {Layout, Text} from '@ui-kitten/components';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {InfluencerCard} from '../../components/Card';

const GET_INFLUENCER_FOR_HOMESCREEN = gql`
  query {
    categoriesForHome(limit: 2) {
      id
      name
      influencerProfiles {
        price
        id
        user {
          name
          avatarUrl
        }
        tags {
          id
          name
        }
      }
    }
  }
`;

export function HomeScreen(props) {
  const {loading, error, data} = useQuery(GET_INFLUENCER_FOR_HOMESCREEN);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error....${error.message}</Text>;

  return (
    <Layout>
      <Searchbar placeholder="Type Here" />
      <ScrollView style={styles.rootScrollView}>
        {data.categoriesForHome.map(category => (
          <Layout key={category.id}>
            <Text category="h5" style={styles.header}>
              {category.name}
            </Text>
            <ScrollView horizontal={true}>
              {category.influencerProfiles.map(profile => (
                <View key={profile.id} style={{padding: 5}}>
                  <InfluencerCard influencer={profile} />
                </View>
              ))}
            </ScrollView>
          </Layout>
        ))}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  rootScrollView: {
    marginBottom: 50,
  },
  header: {
    margin: 10,
    fontWeight: 'bold',
  },
});