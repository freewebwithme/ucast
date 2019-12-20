import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {FeaturedInf, Youtuber} from '../components/InfluencerFlatList';

export default function HomeScreen() {
  return (
    <View>
      <SearchBar placeholder="Type Here" />
      <ScrollView>
        <Text style={styles.header}> Featured </Text>
        <FeaturedInf />
        <Text style={styles.header}> YouTubers </Text>
	<Youtuber />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
