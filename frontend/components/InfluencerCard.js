import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';


export default class InfluencerCard extends React.Component {
  render() {

    return(
      
      <Card containerStyle={{padding: 0}}>
            <View style={styles.user}>
              <Image
        	style={styles.image}
        	resizeMode="cover"
        	source={{ uri: this.props.data.avatar }}
              />
              <Text style={styles.name}>{this.props.data.name}</Text>
              <Text style={styles.name}>{this.props.data.category}</Text>
              <Text style={styles.name}>{this.props.data.price}</Text>
            </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  user: {
    backgroundColor: 'white',
  },

  image: {
    width: 50,
    height: 50
  },
  name: {
    color: 'black',
  }
})
