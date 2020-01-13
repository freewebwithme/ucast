import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { tabIconSelected, tabIconDefault }from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={props.focused? tabIconSelected : tabIconDefault}
    />
  );
}
