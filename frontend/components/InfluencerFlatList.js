import React from 'react';
import {StyleSheet} from 'react-native';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import InfluencerCard from './InfluencerCard';

const GET_USERS_QUERY = gql`
  query {
    users {
      name
      email
      id
      userType
    }
  }
`;

export function FeaturedInf() {
  const {loading, error, data} = useQuery(GET_USERS_QUERY);

  return <InfluencerCard loading={loading} error={error} data={data} />;
}

const YOUTUBERS_QUERY = gql`
 query {
  users {
    name
    email
    id
    userType
  }
 }
`;

export function Youtuber() {
  const {loading, error, data} = useQuery(YOUTUBERS_QUERY);

  return <InfluencerCard loading={loading} error={error} data={data} />;
}
const styles = StyleSheet.create({});
