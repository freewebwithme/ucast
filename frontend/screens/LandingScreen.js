import React, { useState } from "react";
import { useNavigation } from "react-navigation-hooks";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import { GoogleLoginButton } from "../oAuth/GoogleLogin";
import { FacebookLoginButton } from "../oAuth/FacebookLogin";
import { InstagramLoginButton } from "../oAuth/InstagramLogin";
import * as SecureStore from "expo-secure-store";
import globalStyles from "../styles/Global.js";

const bgImage = require("../assets/images/pic2.jpg");

function LandingScreen() {
  const { navigate } = useNavigation();
  const [error, setError] = useState("");
  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={bgImage}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          opacity: 1.0
        }}
      >
        <View style={{ ...globalStyles.container, flex: 6 }}>
          <Text style={styles.landingText}>소중한 사람에게</Text>
          <Text style={styles.landingText}>추억을 선물하세요</Text>
        </View>
        <View style={{ ...globalStyles.colContainer, flex: 2 }}>
	  <GoogleLoginButton onError={setError} />
        </View>
        <View
          style={{
            ...globalStyles.rowContainer,
            flex: 1
          }}
        >
          <Button
            mode="text"
            uppercase={false}
            onPress={() => {
              navigate("Login");
            }}
          >
           로그인 
          </Button>
          <Text> or </Text>
          <Button
            mode="text"
            uppercase={false}
            onPress={() => {
              navigate("SignUp");
            }}
          >
           회원가입 
          </Button>
        </View>
	<View style={{...styles.colContainer, flex: 1 }}>
	  <Text> {error} </Text>
	</View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  landingText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30
  }
});

export default LandingScreen;
