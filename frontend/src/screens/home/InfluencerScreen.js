import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

export function InfluencerScreen(props) {
  return (
    <Layout>
      <ScrollView>
        <Text>Hello this is influencer screen</Text>
      </ScrollView>
    </Layout>
  );
}
