import React, { useState }from "react";
import { useNavigation } from "react-navigation-hooks";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import { GoogleLoginButton } from "../oAuth/GoogleLogin";
import { FacebookLoginButton } from "../oAuth/FacebookLogin";
import { InstagramLoginButton } from "../oAuth/InstagramLogin";
import * as SecureStore from "expo-secure-store";


const bgImage = require("../assets/images/pic2.jpg");

function LandingScreen() {
  const { navigate } = useNavigation();
  const [error, setError] = useState("");
  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          opacity: 1.0
        }}
      >
        <View style={{ ...styles.container, flex: 6 }}>
          <Text style={styles.landingText}>소중한 사람에게</Text>
          <Text style={styles.landingText}>추억을 선물하세요</Text>
        </View>
        <View style={{ ...styles.colContainer, flex: 2 }}>
	  <GoogleLoginButton onError={setError} />
        </View>
        <View
          style={{
            ...styles.rowContainer,
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
          <Button
            mode="text"
            uppercase={false}
            onPress={() => {
	     let result = SecureStore.getItemAsync("fbToken");
	      { result ? console.log(result) : console.log("nothing")};

            }}
          >
           Get Data 
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
  container: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight
  },
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  colContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  landingText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30
  }
});

export default LandingScreen;
