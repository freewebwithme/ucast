import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import globalStyles from '../../styles/Global';
import {Searchbar} from 'react-native-paper';
import {Layout, Text} from '@ui-kitten/components';
import {useQuery} from '@apollo/react-hooks';
import {InfluencerCard} from '../../components/influencers/Card';
import {GET_INFLUENCER_FOR_HOMESCREEN} from '../../queries/InfluencerQuery';

export function HomeScreen(props) {
  const {loading, error, data} = useQuery(GET_INFLUENCER_FOR_HOMESCREEN);
  const {navigation} = props;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error....${error.message}</Text>;

  return (
    <Layout>
      <Searchbar placeholder="Type Here" />
      <ScrollView style={styles.rootScrollView}>
        {data.categoriesForHome.map(category => (
          <Layout key={category.id}>
            <Text category="h5" style={styles.header}>
              {category.name}({category.total})
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {category.influencerProfiles.map(profile => (
                <View key={profile.id} style={{padding: 5}}>
                  <InfluencerCard
                    influencer={profile}
                    navigations={navigation}
                  />
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
