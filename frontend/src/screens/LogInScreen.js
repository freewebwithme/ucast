import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import formStyles from '../styles/FormStyles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {storage} from '../utils/Storage';
import {UserTokenContext} from '../navigations/AppNavigator';

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        name
        providerId
        providerName
        email
      }
      token
    }
  }
`;

export function LogInScreen({navigation}) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [error, setError] = useState(null);

  const userTokenContext = React.useContext(UserTokenContext);
  /* Plain Sign in useMutation */

  const [signIn, {loading}] = useMutation(SIGN_IN, {
    onCompleted(data) {
      let token = data.signin.token;
      storage.set('userToken', token);
      /* Calling setUserToken function from AppNavigator to update userToken
        and navigate to Main page */
      userTokenContext(token);

      navigation.navigate('Home');
    },
    onError(error) {
      console.log('Printing sign in error', error.message);
      setError(error);
    },
  });

  //if (signin_result.error) {
  //  console.log('printing usemutation error:', signin_result.error);
  //}
  if (loading) {
    console.log('printing usemutation loading');
  }

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior="padding"
      enabled>
      <View style={styles.loginContainer}>
        <View style={formStyles.formView}>
          <Text style={formStyles.formTitle}>UCast로 로그인 하세요</Text>
          <TextInput
            label="이메일을 입력하세요."
            style={formStyles.textInput}
            onChangeText={userEmail => setLoginEmail(userEmail)}
          />
          <HelperText
            type="error"
            visible={loginEmail.lLandingength < 5 || loginEmail.length > 30}>
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
                  email: loginEmail,
                  password: loginPass,
                },
              });
            }}
            style={{marginTop: 15}}
            mode="contained"
            loading={loading}
            disabled={!loginEmail || !loginPass}>
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
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: getStatusBarHeight(),
  },
});
