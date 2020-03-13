import React from 'react';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import {useQuery} from '@apollo/react-hooks';
import Video from 'react-native-video';
import Animated from 'react-native-reanimated';
import {onScroll} from 'react-native-redash';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Chip} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-elements';
import {GET_INFLUENCER} from '../../queries/InfluencerQuery';
import {VolumeOffIcon, VolumeOnIcon} from '../../styles/Icons';
import {useSafeArea} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';

const {height} = Dimensions.get('window');
const BUTTON_CONTAINER_HEIGHT = height / 1.5;

const {Value, interpolate, Extrapolate} = Animated;

const translationY = new Value(0);

export function InfluencerScreen({route, navigation}) {
  const insets = useSafeArea();

  const [player, setPlayer] = React.useState(null);
  const [muteStatus, setMuteStatus] = React.useState(true);
  const headerOpacity = interpolate(translationY, {
    inputRange: [0, BUTTON_CONTAINER_HEIGHT, height - insets.top],
    outputRange: [0, 1, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  /* Pass animated value (headeOpacity) for
    header opacity animation */
  React.useEffect(() => {
    navigation.dispatch(
      CommonActions.setParams({
        opacity: headerOpacity,
      }),
    );
  }, []);

  const {influencer} = route.params;
  const {loading, error, data} = useQuery(GET_INFLUENCER, {
    variables: {id: influencer.id},
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error....`{error.message}`</Text>;

  function ratingCompleted(rating) {
    console.log('Rating completed: ', rating);
  }

  /* Toggle mute value */
  function muteButtonPressed() {
    if (player) {
      setMuteStatus(prev => {
        return !prev;
      });
    } else {
      return muteStatus;
    }
  }

  /* Animated value for Button Container Opacity
     When scroll up, opacity changes from 1 to 0 */
  const opacity = interpolate(translationY, {
    inputRange: [
      0,
      BUTTON_CONTAINER_HEIGHT - 100,
      height - getStatusBarHeight(),
    ],
    outputRange: [1, 0, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  /* When scroll up, Book button show up from the bottom */
  const moveButton = interpolate(translationY, {
    inputRange: [
      0,
      BUTTON_CONTAINER_HEIGHT - 100,
      height - getStatusBarHeight(),
    ],
    outputRange: [100, 0, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    /* marginTop: -60 for cover header background showing while navigating
      to influencer page before playing video */
    <Layout style={{flex: 1, marginTop: -60}}>
      <View style={styles.videoContainer}>
        <Video
          source={{
            uri:
              'https://u-cast-converted-video.s3-us-west-2.amazonaws.com/assets/download.mp4',
          }}
          ref={ref => {
            setPlayer(ref);
          }}
          muted={muteStatus}
          repeat={true}
          style={styles.video}
          resizeMode={'cover'}
        />
      </View>
      <View>
        <Animated.ScrollView
          onScroll={onScroll({y: translationY})}
          onScrollBeginDrag={() => setMuteStatus(true)}
          showVerticalScrollIndicator={false}
          scrollEventThrottle={1}>
          <Animated.View style={[styles.buttonContainer, {opacity}]}>
            <Animated.Text
              style={{color: 'white', fontSize: 36, marginBottom: 10}}>
              {data.influencer.user.name}
            </Animated.Text>
            <Animated.Text
              style={{color: 'white', fontSize: 24, marginBottom: 10}}>
              {data.influencer.category.name}
            </Animated.Text>
            <Button status="success">예약하기 {data.influencer.price}</Button>
            <Button
              appearance="ghost"
              status="basic"
              style={styles.muteButton}
              icon={muteStatus ? VolumeOnIcon : VolumeOffIcon}
              onPress={muteButtonPressed}
            />
          </Animated.View>
          <View style={styles.contentContainer}>
            <Rating
              ratingCount={5}
              imageSize={20}
              showRating
              style={{paddingVertical: 10}}
              onFinishRating={ratingCompleted}
            />
            <Text category="h2" style={styles.textStyle}>
              {data.influencer.user.intro}
            </Text>
            <View style={{flexDirection: 'row'}}>
              {data.influencer.tags.map(tag => (
                <Chip
                  key={tag.id}
                  textStyle={{color: 'white'}}
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: '#42AAFF',
                  }}>
                  {tag.name}
                </Chip>
              ))}
            </View>
            <Text category="h3" style={styles.textStyle}>
              Hello World-3
            </Text>
            <Text category="h3" style={styles.textStyle}>
              Hello World-4
            </Text>
            <Text category="h3" style={styles.textStyle}>
              Hello World-5
            </Text>
            <Text category="h3" style={styles.textStyle}>
              Hello World-6
            </Text>
            <Text category="h3" style={styles.textStyle}>
              Hello World-7
            </Text>
            <Text category="h3" style={styles.textStyle}>
              Hello World-6
            </Text>
            <Text category="h3" style={styles.textStyle}>
              Hello World-7
            </Text>
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            transform: [{translateY: moveButton}],
          }}>
          <Button status="success" style={{height: 60, margin: 20}}>
            예약하기 {data.influencer.price}
          </Button>
        </Animated.View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'grey',
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
  textStyle: {
    height: 100,
    fontSize: 24,
    marginTop: 10,
  },
  muteButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 20,
    top: height / 1.6,
    backgroundColor: 'white',

    borderRadius: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: BUTTON_CONTAINER_HEIGHT,
    marginBottom: 30,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
  },
  detailScrollView: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 50,
  },
});
