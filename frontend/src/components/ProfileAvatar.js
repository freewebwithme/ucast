import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Button} from '@ui-kitten/components';
import {CameraIcon} from '../styles/Icons';

const defaultAvatar = require('../assets/images/default-avatar.jpg');

export function ProfileAvatar(props) {
  const {style, source, onPress, ...restProps} = props;

  /* Check if source and source.uri is available
     if it is null, display default avatar image */
  return (
    <View style={[style, styles.avatarContainer]}>
      {source ? (
        source.url ? (
          <Avatar
            {...restProps}
            source={source}
            style={[style, styles.avatar]}
          />
        ) : (
          <Avatar
            {...restProps}
            source={defaultAvatar}
            style={[style, styles.avatar]}
          />
        )
      ) : (
        <Avatar
          {...restProps}
          source={defaultAvatar}
          style={[style, styles.avatar]}
        />
      )}
      <Button
        status="basic"
        icon={CameraIcon}
        style={styles.editButton}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    aspectRatio: 1.0,
    height: 80,
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: -10,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
});
