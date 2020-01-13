import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { modifyErrorMessage } from "../helpers/Helpers";
import { useNavigation } from "react-navigation-hooks";
import formStyles from "../styles/FormStyles";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      user {
        username
      }
      token
    }
  }
`;

function LogInScreen() {
  const { navigate } = useNavigation();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted(data) {
      console.log("Printing data");
      console.log(data.signin.token);
      SecureStore.setItemAsync("userToken", data.signin.token);
      navigate("Main");
    }
  });

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior="padding"
      enabled
    >
      <View style={styles.loginContainer}>
        <View style={formStyles.formView}>
          <Text style={formStyles.formTitle}>UCast로 로그인 하세요</Text>
          <TextInput
            label="Email address or username"
            style={formStyles.textInput}
            onChangeText={userEmail => setLoginEmail(userEmail)}
          />
          <HelperText
            type="error"
            visible={loginEmail.length < 5 || loginEmail.length > 30}
          >
            이메일이나 아이디는 5자이상 30자 미만이어야 합니다.
          </HelperText>
          <TextInput
            label="Password"
            style={formStyles.textInput}
            secureTextEntry={true}
            onChangeText={password => setLoginPass(password)}
          />
          <Button
            onPress={e => {
              e.preventDefault();
              signIn({
                variables: {
                  username: loginEmail,
                  password: loginPass
                }
              });
            }}
            style={{ marginTop: 15 }}
            mode="contained"
            disabled={!loginEmail || !loginPass}
            loading={loading}
          >
            Log In
          </Button>
          {error && <Text style={formStyles.errorText}>{error.message}</Text>}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight
  }
});
export default LogInScreen;
