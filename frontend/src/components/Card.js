import React from 'react';
import {StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {Button, Layout, Text, Card} from '@ui-kitten/components';

function CardHeader(props) {
  const {image, price} = props;
  return (
    <React.Fragment>
      <ImageBackground style={styles.headerImage} source={{uri: image}}>
        <Button style={styles.priceButton} size="tiny">
          {price}
        </Button>
      </ImageBackground>
    </React.Fragment>
  );
}

export const InfluencerCard = props => {
  /* influencer has name, category and avatarUrl */
  const {influencer, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('Card Clicked!');
        navigation.navigate('InfluencerScreen');
      }}>
      <Card
        style={styles.card}
        header={() => (
          <CardHeader
            image={influencer.user.avatarUrl}
            price={influencer.price}
          />
        )}>
        <Text style={{...styles.headerText, fontWeight: 'bold'}} category="s1">
          {influencer.user.name}
        </Text>
        <Text style={styles.headerText} category="s1">
          {influencer.tags[0].name}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
  },
  headerImage: {
    height: 175,
    width: 175,
    resizeMode: 'cover',
  },
  headerText: {
    textAlign: 'center',
    marginVertical: 2,
  },
  priceButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    borderRadius: 16,
    paddingHorizontal: 0,
  },
});
