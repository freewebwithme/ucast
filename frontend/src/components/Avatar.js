import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Button} from '@ui-kitten/components';
import {CameraIcon} from '../styles/Icons';

export function ProfileAvatar(props) {
  const {style, ...restProps} = props;

  return (
    <View style={style}>
      <Avatar {...restProps} style={[style, styles.avatar]} />
      <Button status="basic" icon={CameraIcon} style={styles.editButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: -10,
    height: 60,
    borderRadius: 60 / 2,
  },
});
