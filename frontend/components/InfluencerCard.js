import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

export default function InfluencerCard({ loading, error, data }) {
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...${error.message}</Text>;

  return (
    <View>
      <ScrollView horizontal={true}>
        {data.influencer.map(influencer => (
          <View key={influencer.id} style={styles.card}>
            <View style={styles.user}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{
                  uri: influencer.avatarUrl
                }}
              />
              <Text>{influencer.name}</Text>
              <Text>{influencer.influencerProfile.category}</Text>
              {influencer.influencerProfile.tags.map(tag => (
		// TODO : Create unique key....
                <View key={influencer.id + tag.name}>
		  <Text>{tag.name}</Text>
		</View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 150,
    height: 150
  },
  card: {
    padding: 5,
    borderColor: "#fff"
  }
});
