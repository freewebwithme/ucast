import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { FeaturedInf, Influencers } from "../components/InfluencerFlatList";
import globalStyles from "../styles/Global";

export default function HomeScreen() {
  return (
    <View style={globalStyles.container}>
      <SearchBar placeholder="Type Here" />
      <ScrollView style={styles.rootScrollView}>
        <Text style={styles.header}> 모든 유명인 </Text>
        <FeaturedInf />
        <Text style={styles.header}> 유투버 </Text>
        <Influencers category={"유투버"} />
        <Text style={styles.header}> 작곡가 </Text>
        <Influencers category={"배우"} />
        <Text style={styles.header}> 코메디언 </Text>
        <Influencers category={"코미디언"} />
        <Text style={styles.header}> 엠씨 </Text>
        <Influencers category={"엠씨"} />
        <Text style={styles.header}> 운동선수</Text>
        <Influencers category={"운동선수"} />
        <Text style={styles.header}> 프로게이머</Text>
        <Influencers category={"프로게이머"} />
        <Text style={styles.header}> 가수 </Text>
        <Influencers category={"가수"} />
        <Text style={styles.header}> 컨텐츠 크리에이터</Text>
        <Influencers category={"컨텐츠 크리에이터"} />
        <Text style={styles.header}> 작사가 </Text>
        <Influencers category={"작사가"} />
        <Text style={styles.header}> 헬스 트레이너 </Text>
        <Influencers category={"헬스 트레이너"} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScrollView: {
    marginBottom: 50
  },
  header: {
    fontSize: 24,
    fontWeight: "bold"
  }
});
