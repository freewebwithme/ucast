import React from 'react';
import {StyleSheet, View, ImageBackground, Image} from 'react-native';
import {Button, Layout, Text, Card} from '@ui-kitten/components';

function CardHeader(props) {
  const {image, name, price, category} = props;
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
  const {influencer} = props;
  return (
    <Card
      style={styles.card}
      header={() => (
        <CardHeader
          image={influencer.avatarUrl}
          name={influencer.name}
          price={influencer.price}
          category={influencer.category}
        />
      )}>
      <Text style={{...styles.headerText, fontWeight: 'bold'}} category="s1">
        {influencer.name}
      </Text>
      <Text style={styles.headerText} category="s1">
        {influencer.category}
      </Text>
    </Card>
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
    marginVertical: 4,
  },
  priceButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    borderRadius: 16,
    paddingHorizontal: 0,
  },
});
