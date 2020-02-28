import React from 'react';
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Button, Layout, Text, Card} from '@ui-kitten/components';
import {InfluencerCard} from '../components/Card.js';

const sampleImage = require('../assets/images/sample.jpg');

export function NotificationScreen() {
  const influencer = {
    user: {
      name: '김태환',
      avatarUrl:
        'https://ucastprofilepic.s3-us-west-2.amazonaws.com/adult-beard-boy-casual-220453.jpg',
    },
    category: '종합 엔터테이너',
    price: '$100',
    tags: ['MC'],
  };

  return (
    <Layout style={styles.container}>
      <InfluencerCard influencer={influencer} />
      <TouchableOpacity onPress={() => onClick()}>
        <Text>Hello Workd</Text>
      </TouchableOpacity>
    </Layout>
  );
}

const onClick = () => {
  console.log('Clicked');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
