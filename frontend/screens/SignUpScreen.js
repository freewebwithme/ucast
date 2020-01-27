import React, { useState } from "react";
import { KeyboardAvoidingView, View, Text, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useNavigation } from "react-navigation-hooks";
import { useMutation } from "@apollo/react-hooks";
import formStyles from "../styles/FormStyles";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { validateEmailLength, validateEmailFormat } from "../helpers/Helpers";
import gql from "graphql-tag";

const SIGNUP_NEW_USER = gql`
mutation($email: String!, $name: String!, $password: String!){
  signup(email: $email, name: $name, password: $password) {
    user{
      name
      email
      avatarUrl
}
    token
}
}
`;

// Step 1 for fullname
export function SignUpScreen() {
  const [name, setName] = useState("");
  const { navigate } = useNavigation();
  SecureStore.setItemAsync("name", name);
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior="padding"
      enabled
    >
      <View>
        <Text>Step 1 of 3</Text>
        <Text style={formStyles.formTitle}>이름을 입력하세요</Text>
        <TextInput
          label="이름"
          style={formStyles.textInput}
          onChangeText={text => setName(text)}
        />
        <HelperText type="error" visible={name.length < 2 || name.length > 10}>
          2자이상의 이름을 입력하세요.
        </HelperText>
        <Button
          mode="contained"
          disabled={!name || name.length < 2 || name.length > 10}
          style={{ marginTop: 15 }}
          onPress={e => {
            e.preventDefault();
            navigate("StepTwo");
          }}
        >
          계속하기
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

export function StepTwoScreen() {
  const [email, setEmail] = useState("");
  const { navigate } = useNavigation();
  SecureStore.setItemAsync("email", email);

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior="padding"
      enabled
    >
      <View>
        <Text>Step 2 of 3</Text>
        <Text style={formStyles.formTitle}>이메일을 입력하세요</Text>
        <TextInput
          label="이메일"
          style={formStyles.textInput}
          onChangeText={text => setEmail(text)}
        />
        <HelperText type="error" visible={!validateEmailLength(email)}>
           이메일은 10자이상 30자 미만이어야 합니다.
        </HelperText>
        <HelperText type="error" visible={!validateEmailFormat(email)}>
          올바른 이메일 형식을 입력하세요.
        </HelperText>
        <Button
          mode="contained"
          disabled={!validateEmailLength(email) || !validateEmailFormat(email)}
          style={{ marginTop: 15 }}
          onPress={e => {
            e.preventDefault();
            navigate("StepThree");
          }}
        >
          계속하기
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}


export function StepThreeScreen() {
  let info = new Map();
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();
    const [signUp, {loading, error}] = useMutation(SIGNUP_NEW_USER, {
        onCompleted(data){
            console.log("Signup successful: ", data);
            SecureStore.deleteItemAsync("name");
            SecureStore.deleteItemAsync("email");
            SecureStore.deleteItemAsync("password");
            info = new Map(); 
            navigate("Main");
        },
    });
  SecureStore.setItemAsync("password", password);

  SecureStore.getItemAsync("name").then(result => info.set("name", result));
  SecureStore.getItemAsync("email").then(result => info.set("email", result));
  SecureStore.getItemAsync("password").then(result =>
    info.set("password", result)
  );

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior="padding"
      enabled
    >
      <View>
        <Text>Step 3 of 3</Text>
        <Text style={formStyles.formTitle}>비밀번호를 쓰세요</Text>
        <TextInput
          label="비밀번호"
      secureTextEntry={true}
          style={formStyles.textInput}
          onChangeText={text => setPassword(text)}
        />
        <Button
          mode="contained"
          disabled={!password}
          style={{ marginTop: 15 }}
      loading={loading}
          onPress={e => {
            e.preventDefault();

            console.log(info);
              signUp({
                  variables: {
                      email: info.get("email"),
                      name: info.get("name"),
                      password: info.get("password")
                  }
              });
          }}
        >
          가입하기
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    marginTop: Constants.statusBarHeight
  }
});

