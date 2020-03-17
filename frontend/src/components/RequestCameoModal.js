import React from 'react';
import {Layout, Text, Button, Divider, Avatar} from '@ui-kitten/components';
import {TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {BackIcon, GiftIcon} from '../styles/Icons';

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
            step2_visible: false,
            step3_visible: false,
            headerOpacity: 0,
          };
        case 'STEP_2':
          return {
            ...prevState,
            step1_visible: false,
            step2_visible: true,
            step3_visible: false,
            headerOpacity: 100,
          };
        case 'STEP_3':
          return {
            ...prevState,
            step1_visible: false,
            step2_visible: false,
            step3_visible: true,
            headerOpacity: 100,
          };
        case 'CLOSE':
          setVisible(false);
          return {
            ...prevState,
            step1_visible: false,
            step2_visible: false,
            step3_visible: false,
          };
      }
    },
    {
      step2_visible: false,
      step3_visible: false,
      headerOpacity: 0,
    },
  );

  const closeButtonClick = () => {
    videoDispatch({type: 'PLAY'});
    dispatch({type: 'CLOSE'});
  };

  return (
    <Layout style={styles.modalContainer}>
      <Modal backdropStyle={styles.modal} visible={step1_visible}>
        <Layout style={styles.requestHeader}>
          <Button
            appearance="ghost"
            icon={BackIcon}
            style={{
              backgroundColor: 'white',
              opacity: state.headerOpacity,
            }}></Button>
          <Text>카메오 신청하기</Text>
          <Button
            appearance="ghost"
            style={styles.dismissButton}
            onPress={closeButtonClick}>
            Cacnel
          </Button>
        </Layout>
        <Layout style={styles.avatarContainer}>
          <Avatar
            style={styles.avatar}
            source={{
              uri:
                'https://ucastprofilepic.s3-us-west-2.amazonaws.com/adult-beard-boy-casual-220453.jpg',
            }}
          />
          <Text category="s1" style={styles.avatarText}>
            {influencer.user.name}
          </Text>
        </Layout>
        <Layout style={styles.buttonContainer}>
          <TouchableOpacity>
            <Layout style={styles.rowButtonContainer}>
              <Avatar
                style={styles.meAvatar}
                size="giant"
                source={{
                  uri:
                    'https://ucastprofilepic.s3-us-west-2.amazonaws.com/adult-beard-boy-casual-220453.jpg',
                }}
              />
              <Text category="h6">나에게 보내기</Text>
            </Layout>
          </TouchableOpacity>
          <TouchableOpacity>
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
                  style={{borderRadius: 10}}></Button>
              </Layout>
              <Text category="h6">선물로 보내기</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>
      </Modal>
      <Modal backdropStyle={styles.modal} visible={state.step2_visible}>
        <Button
          appearance="ghost"
          style={styles.dismissButton}
          onPress={closeButtonClick}>
          Close
        </Button>
        <Text> This is a second modal</Text>
        <Text> This is a second modal</Text>
        <Text> This is a second modal</Text>
        <Text> This is a second modal</Text>
        <Text> This is a second modal</Text>
        <Text> This is a second modal</Text>
        <Button
          onPress={() => {
            dispatch({type: 'STEP_1'});
          }}>
          Goto Modal1
        </Button>
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
});
