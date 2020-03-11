import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import {BackIcon} from '../styles/Icons';
import {HeartIcon} from '../styles/Icons';
import {Button} from '@ui-kitten/components';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

export function InfluencerHeader(props) {
  const {scene, previous, navigation} = props;

  function buttonPressed(e) {
    e.preventDefault();
  }

  console.log('Printing Props: ', props);
  const opacity = scene.route.params.opacity;
  return (
    <SafeAreaView>
      <React.Fragment>
        <Animated.View style={[styles.headerStyle, {opacity}]}>
          <View style={styles.influencerNameContainer}>
            <Text style={styles.influencerName}>
              {scene.route.params.influencer.user.name}
            </Text>
          </View>
        </Animated.View>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth,
          }}>
          {previous ? (
            /* This is a back button */
            <InfluencerBackButton
              style={{left: 0}}
              onPress={() => navigation.goBack()}
            />
          ) : (
            undefined
          )}
          <InfluencerWishButton
            onPress={() => alert('wish button clicked')}
            style={{right: 0}}
          />
        </View>
      </React.Fragment>
    </SafeAreaView>
  );
}

export function InfluencerBackButton({onPress, style}) {
  return (
    <Button
      style={[style, styles.iconButton]}
      appearance="ghost"
      icon={BackIcon}
      onPress={onPress}
    />
  );
}

export function InfluencerWishButton({onPress, style}) {
  return (
    <Button
      style={[style, styles.iconButton]}
      appearance="ghost"
      icon={HeartIcon}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    height: 60,
    width: windowWidth,
  },
  influencerNameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  influencerName: {
    fontSize: 18,
  },
  iconButton: {
    marginHorizontal: 20,
    marginVertical: 5,
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: 'white',
    top: 0,
    //    position: 'absolute',
  },
});
