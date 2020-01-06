import React from "react";
import { StyleSheet, View, Text} from "react-native";
import { Button } from 'react-native-paper';
import { createStackNavigator } from "react-navigation-stack";
import Constants from 'expo-constants';

function LandingScreen() {
  return (
    <View style={styles.container}>
      <View> 
      <Text>This is Landing Screen</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
	<Button mode="text" 
		uppercase={false}
		onPress={() => console.log("Button Pressed")}>
	  Log in
	</Button>
	<Text> or </Text>
	<Button mode="text" 
		uppercase={false}
		onPress={() => console.log("Button Pressed")}>
	  Sign up	
	</Button>
      </View>
    </View>
  );
}

function SignInScreen(){
}

function SignUpScreen() {

}

const config = {
  headerMode: 'none',
}

const LandingStack = createStackNavigator({
  Landing: LandingScreen
}, config);


export { LandingStack };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
})
