import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {InfluencerCard, ImageOverlay} from '../components/Card';
const sampleImage = require('../assets/images/sample.jpg');

export function NotificationScreen() {
  const influencer = {
    name: '김태환',
    category: '종합 엔터테이너',
    avatarUrl:
      'https://ucastprofilepic.s3-us-west-2.amazonaws.com/adult-beard-boy-casual-220453.jpg',
    price: '$100',
  };

  return (
    <Layout style={styles.container}>
      <Text category="h2">Hello World!</Text>
      <InfluencerCard influencer={influencer} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
