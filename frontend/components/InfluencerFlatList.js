import React from 'react';
import {StyleSheet} from 'react-native';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import InfluencerCard from './InfluencerCard';

const GET_ALL_INFLUENCERS_QUERY = gql`
  query {
    influencer {
     id
     name
     avatarUrl
     influencerProfile {
      category
      tags {
	name
      }
     }
    }
  }
`;

export function FeaturedInf() {
  const {loading, error, data} = useQuery(GET_ALL_INFLUENCERS_QUERY);

  return <InfluencerCard loading={loading} error={error} data={data} />;
}

const INFLUENCER_QUERY = gql`
 query Influencers($category: String!){
  influencer(category: $category) {
    id
    name
    avatarUrl
    influencerProfile {
      category
      tags {
        name
      }
    }
  }
 }
`;

export function Influencers({ category }) {
  const {loading, error, data} = useQuery(INFLUENCER_QUERY, {
    variables: { category }
  });

  return <InfluencerCard loading={loading} error={error} data={data} />;
}
const styles = StyleSheet.create({});
