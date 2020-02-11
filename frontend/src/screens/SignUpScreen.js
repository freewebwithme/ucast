import React, { useState } from "react";
import { KeyboardAvoidingView, View, Text, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useMutation } from "@apollo/react-hooks";
import formStyles from "../styles/FormStyles";
import { validateEmailLength, validateEmailFormat } from "../utils/Validators";
import gql from "graphql-tag";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { storage } from "../utils/Storage";
import { UserTokenContext } from "../navigations/AppNavigator";

const SIGNUP_NEW_USER = gql`
  mutation($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      user {
        name
        email
        avatarUrl
      }
      token
    }
  }
`;

// Step 1 for fullname
export function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  storage.set("name", name);

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
            navigation.navigate("StepTwo");
          }}
        >
          계속하기
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

export function StepTwoScreen({ navigation }) {
  const [email, setEmail] = useState("");
  storage.set("email", email);
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
            navigation.navigate("StepThree");
          }}
        >
          계속하기
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

export function StepThreeScreen({ navigation }) {
  let info = new Map();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signUp, { loading }] = useMutation(SIGNUP_NEW_USER, {
    onCompleted(data) {
      console.log("Signup successful: ", data);
      storage.remove("name");
      storage.remove("email");
      info = new Map();
      navigation.navigate("Main");
    },
    onError(error) {
      console.log("Sign up error:", error.message);
      setError(error.message);
    }
  });
  storage.get("name").then(name => info.set("name", name));
  storage.get("email").then(email => info.set("email", email));

  // save password in info map temporarily
  info.set("password", password);

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
        {error && <Text>{error}</Text>}
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
    marginTop: getStatusBarHeight()
  }
});
