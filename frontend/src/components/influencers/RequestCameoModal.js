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

export function RequestCameoModal({
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

  const ModalHeader = ({title, icon, buttonClick, style}) => {
    return (
      <Layout style={[style, styles.requestHeader]}>
        <Button
          appearance="ghost"
          icon={BackIcon}
          style={{
            backgroundColor: 'white',
            opacity: state.headerOpacity,
          }}
        />
        {title ? <Text>{title}</Text> : <Text>카메오 신청하기</Text>}
        {icon ? (
          <Button
            appearance="ghost"
            style={styles.dismissButton}
            icon={icon}
            onPress={buttonClick}
          />
        ) : (
          <Button
            appearance="ghost"
            style={styles.dismissButton}
            onPress={buttonClick}>
            Cacnel
          </Button>
        )}
      </Layout>
    );
  };
  const DrawerModal = () => {
    const [toWhom, setToWhom] = React.useState('');
    return (
      <Animated.View style={[styles.drawerModal, {transform: [{translateY}]}]}>
        <ModalHeader
          title="누구에게 보내실 건가요?"
          style={{
            backgroundColor: 'grey',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}
          icon={CloseCircleIcon}
          buttonClick={() => {
            goDown.setValue(1);
            console.log('Drawer Modal close');
          }}
        />
        <Layout>
          <Layout style={{marginTop: 20}}>
            <ProfileAvatar source={{uri: null}} />
            <Layout
              style={{marginHorizontal: 50, marginTop: 50, marginBottom: 50}}>
              <Input
                label="수신자"
                placeholder="홍길동"
                style={{marginBottom: 20}}
                value={toWhom}
                onChangeText={setToWhom}
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
    <Layout style={styles.modalContainer}>
      <Modal backdropStyle={styles.modal} visible={step1_visible}>
        <ModalHeader buttonClick={closeButtonClick} />
        <Layout style={styles.avatarContainer}>
          <Avatar
            style={styles.avatar}
            source={{
              uri: influencer.user.avatarUrl,
            }}
          />
          <Text category="s1" style={styles.avatarText}>
            {influencer.user.name}
          </Text>
        </Layout>
        <Layout style={styles.buttonContainer}>
          <TouchableOpacity onPress={sendToMe}>
            <Layout style={styles.rowButtonContainer}>
              <Avatar
                style={styles.meAvatar}
                size="giant"
                source={{
                  uri: !currentUser ? null : currentUser.avatarUrl,
                }}
              />
              <Text category="h6">나에게 보내기</Text>
            </Layout>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goUp.setValue(1)}>
            <Layout style={styles.rowButtonContainer}>
              <Layout
                style={{
                  backgroundColor: '#DAE7E6',
                  borderRadius: 30,
                  height: 55,
                  width: 55,
                  justifyContent: 'center',
                  marginRight: 30,
                }}>
                <Button
                  icon={GiftIcon}
                  appearance="ghost"
                  status="basic"
                  style={{borderRadius: 10}}
                />
              </Layout>
              <Text category="h6">선물로 보내기</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>
        <DrawerModal />
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
