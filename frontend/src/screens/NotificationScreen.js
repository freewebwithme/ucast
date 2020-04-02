import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Layout, Text, Card, Input, Avatar} from '@ui-kitten/components';
import {timing, withSpring, clamp} from 'react-native-redash';
import Animated from 'react-native-reanimated';
import {BackIcon, GiftIcon, CloseCircleIcon} from '../styles/Icons';
import {ProfileAvatar} from '../components/ProfileAvatar';

const windowHeight = Dimensions.get('window').height;
const {Value, Clock, cond, useCode, set, block, not, clockRunning} = Animated;

const SNAP_TOP = 0;
const SNAP_BOTTOM = windowHeight;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};
export function NotificationScreen() {
  const translationY = new Value(0);
  const offset = new Value(SNAP_BOTTOM);
  const velocityY = new Value(0);
  const goUp = new Value(0);
  const goDown = new Value(0);

  const translateY = withSpring({
    value: clamp(translationY, SNAP_TOP, SNAP_BOTTOM),
    velocity: velocityY,
    offset,
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
    config,
  });
  const clock = new Clock();
  useCode(
    block([
      cond(goUp, [
        set(offset, timing({clock, from: offset, to: SNAP_TOP})),
        cond(not(clockRunning(clock)), [set(goUp, 0)]),
      ]),
      cond(goDown, [
        set(offset, timing({clock, from: offset, to: SNAP_BOTTOM})),
        cond(not(clockRunning(clock)), [set(goDown, 0)]),
      ]),
    ]),
    [],
  );
  const AnimatedComponent = () => {
    return (
      <Animated.View style={[styles.drawerModal, {transform: [{translateY}]}]}>
        <Layout>
          <Layout style={{marginTop: 20}}>
            <ProfileAvatar source={{uri: null}} />
            <Layout
              style={{marginHorizontal: 50, marginTop: 50, marginBottom: 50}}>
              <Input
                label="수신자"
                placeholder="홍길동"
                style={{marginBottom: 20}}
                value="Hello"
              />
              <Text style={{color: 'grey', fontSize: 14}}>
                수신자의 사진을 추가하시면, 메세지를 녹화할때 도움이 됩니다.
              </Text>
            </Layout>
          </Layout>
        </Layout>
        <Button
          appearance="outline"
          status="success"
          onPress={() => goDown.setValue(1)}
          style={{
            marginHorizontal: 10,
            borderRadius: 10,
          }}>
          저장하기
        </Button>
      </Animated.View>
    );
  };
  return (
    <Layout style={styles.container}>
      <TouchableOpacity onPress={() => goUp.setValue(1)}>
        <Text>show modal</Text>
      </TouchableOpacity>
      <AnimatedComponent />
    </Layout>
  );
}

const styles = StyleSheet.create({
  drawerModal: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: 'absolute',
    top: 200,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
