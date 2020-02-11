import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';

export function SplashScreen() {
  // Render any loading content that you like here
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
