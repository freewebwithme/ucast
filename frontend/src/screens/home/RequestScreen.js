import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';

export function RequestScreen({navigation, route}) {
  const dispatch = route.params.influencerDispatch;
  return (
    <Layout>
      <Text>This is request screen</Text>
      <Button
        onPress={() => {
          dispatch({type: 'PLAY'});
          navigation.navigate('Influencer');
        }}>
        Cancel
      </Button>
    </Layout>
  );
}
