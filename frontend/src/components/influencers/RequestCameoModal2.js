import React from 'react';
import {Layout, Text, Button, Avatar, Input} from '@ui-kitten/components';
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Easing,
} from 'react-native';
import {BackIcon, GiftIcon, CloseCircleIcon} from '../../styles/Icons';
import {storage} from '../../utils/Storage';
import Animated from 'react-native-reanimated';
import {clamp, timing, onGestureEvent, withSpring} from 'react-native-redash';
import {ProfileAvatar} from '../ProfileAvatar';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

import {RequestCameoStep1} from './RequestCameoStep1';
import {RequestCameoStep2} from './RequestCameoStep2';
import {RequestCameoStep3} from './RequestCameoStep3';

const windowHeight = Dimensions.get('window').height;
console.log('Printing windowHeight', windowHeight);
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

export function RequestCameoModal2({
  step1_visible,
  setVisible,
  videoDispatch,
  influencer,
}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'STEP_1':
          return {
            ...prevState,
            step1_visible: true,
            headerOpacity: 0,
            current_step: 'STEP_1',
          };
        case 'STEP_2':
          return {
            ...prevState,
            step1_visible: false,
            headerOpacity: 100,
            current_step: 'STEP_2',
          };
        case 'STEP_3':
          return {
            ...prevState,
            step1_visible: false,
            headerOpacity: 100,
            current_step: 'STEP_3',
          };
        case 'CLOSE':
          setVisible(false);
          return {
            ...prevState,
            step1_visible: false,
            current_step: 'STEP_1',
          };
        case 'RECIPIENT_DRAWER_CLOSE':
          return {};
      }
    },
    {
      current_step: 'STEP_1',
      headerOpacity: 0,
    },
  );

  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    function fetchUser() {
      storage.get('user').then(user => {
        let parsedUser = JSON.parse(user);
        setCurrentUser(parsedUser);
      });
    }
    fetchUser();
  }, []);

  const closeButtonClick = () => {
    videoDispatch({type: 'PLAY'});
    dispatch({type: 'CLOSE'});
  };

  const sendToMe = () => {
    console.log('Send to me Clicked');
  };

  const translationY2 = new Value(0);
  const velocityY = new Value(0);
  const offset = new Value(SNAP_BOTTOM);
  const goUp = new Value(0);
  const goDown = new Value(0);
  const translateY = withSpring({
    value: clamp(translationY2, SNAP_TOP, SNAP_BOTTOM),
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

  return (
    <Layout style={styles.modalContainer}>
      <Modal backdropStyle={styles.modal} visible={step1_visible}>
        <Button onPress={closeButtonClick}>Close</Button>
        <Button onPress={() => goUp.setValue(1)}>Show Drawer</Button>
        <Animated.View
          style={[styles.drawerModal, {transform: [{translateY}]}]}>
          <Text>Hello World!</Text>
        </Animated.View>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'green',
  },
  modal: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'flex-start',
    //    alignItems: 'center',
  },
  dismissButton: {
    fontSize: 24,
    color: 'grey',
  },
  requestHeader: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    marginVertical: 10,
  },
  avatar: {
    aspectRatio: 1.0,
    height: 100,
  },
  buttonContainer: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  rowButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3FBF9',
    height: 100,
    marginHorizontal: 40,
    marginVertical: 5,
    borderRadius: 10,
  },
  meAvatar: {
    marginRight: 30,
  },
  drawerModal: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: 'absolute',
    top: 200,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
