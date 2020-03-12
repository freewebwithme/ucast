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
import {Layout, Button} from '@ui-kitten/components';
import Animated from 'react-native-reanimated';
import {SafeAreaView, useSafeArea} from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

export function InfluencerHeader(props) {
  const {scene, previous, navigation} = props;
  const insets = useSafeArea();
  console.log('PRINTING INSETS: ', insets);
  const opacity = scene.route.params.opacity;
  return (
    <React.Fragment>
      <Animated.View
        style={[styles.headerStyle, {opacity, marginTop: insets.top - 7}]}>
        <View style={[styles.influencerNameContainer]}>
          <Text style={styles.influencerName}>
            {scene.route.params.influencer.user.name}
          </Text>
        </View>
      </Animated.View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: insets.top,
          width: windowWidth,
        }}>
        {previous ? (
          /* This is a back button */
          <InfluencerBackButton onPress={() => navigation.goBack()} />
        ) : (
          undefined
        )}
        <InfluencerWishButton onPress={() => alert('wish button clicked')} />
      </View>
    </React.Fragment>
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
    //    top: 0,
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
    //  top: 0,
    //    position: 'absolute',
  },
});
