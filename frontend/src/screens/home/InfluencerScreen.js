import React from 'react';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Video from 'react-native-video';
import globalStyles from '../../styles/Global';

export function InfluencerScreen({route}) {
  const {influencer} = route.params;
  let player;
  console.log('Inspecting influencer', influencer);
  return (
    <Layout style={{flex: 1}}>
      <Layout style={styles.videoContainer}>
        <Video
          source={{
            uri:
              'https://u-cast-converted-video.s3-us-west-2.amazonaws.com/assets/download.mp4',
          }}
          ref={ref => {
            player = ref;
          }}
          muted={true}
          repeat={false}
          onBuffer={() => onBuffer()}
          onError={() => onVideoError()}
          style={styles.video}
          resizeMode={'cover'}
        />
        <ScrollView style={{marginTop: 200}}>
          <Text style={{height: 200}}> Hello World!</Text>
          <Text style={{height: 200}}> Hello World!</Text>
          <Text style={{height: 200}}> Hello World!</Text>
          <Text style={{height: 200}}> Hello World!</Text>
          <Text style={{height: 200}}> Hello World!</Text>
        </ScrollView>
      </Layout>
    </Layout>
  );
}

const {height} = Dimensions.get('window');
console.log('Printing dimensions: ', height);
const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'red',
  },
  video: {
    height: height,
    alignSelf: 'stretch',
    width: null,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
