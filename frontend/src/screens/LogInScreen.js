import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import formStyles from '../styles/FormStyles';
import {storage} from '../utils/Storage';
import {AuthContext} from '../navigations/AppNavigator';
import {Layout, Text, Button, Input} from '@ui-kitten/components';
import {validateEmailFormat, validateEmailLength} from '../utils/Validators';
import {LoadingIcon, LogInIcon} from '../styles/Icons';
import {SIGN_IN} from '../queries/UserQuery';

export function LogInScreen({navigation}) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [error, setError] = useState(null);

  const {signIn} = React.useContext(AuthContext);
  /* Plain Sign in useMutation */

  const [plainSignIn, {loading}] = useMutation(SIGN_IN, {
    async onCompleted(data) {
      const token = data.signin.token;
      const user = data.signin.user;
      /* Calling signIn function from AppNavigator to update userToken
        and navigate to Main page */
      signIn(token, user);

      // navigation.navigate('Home');
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

  const validEmail =
    validateEmailFormat(loginEmail) && validateEmailLength(loginEmail);

  return (
    <Layout style={styles.loginContainer}>
      <KeyboardAvoidingView enabled>
        <Layout style={formStyles.formView}>
          <Text style={{marginBottom: 20}} category="h3">
            UCast로 로그인 하세요
          </Text>
          <Input
            label="이메일을 입력하세요."
            style={formStyles.textInput}
            status={validEmail ? 'success' : 'danger'}
            caption={!validEmail ? '올바른 이메일 형식이 아닙니다.' : ''}
            placeholder="john@example.com"
            onChangeText={userEmail => setLoginEmail(userEmail)}
          />
          <Input
            label="Password"
            style={{...formStyles.textInput, marginTop: 10}}
            secureTextEntry={true}
            placeholder="*************"
            onChangeText={password => setLoginPass(password)}
          />
          <Button
            onPress={e => {
              e.preventDefault();
              plainSignIn({
                variables: {
                  email: loginEmail,
                  password: loginPass,
                },
              });
            }}
            style={{marginTop: 15}}
            appearance="outline"
            icon={loading ? LoadingIcon : LogInIcon}
            disabled={!loginEmail || !loginPass}>
            로그인
          </Button>
          {error && (
            <Text
              style={{marginTop: 10, color: 'red'}}
              status="danger"
              category="c2">
              {error.message}
            </Text>
          )}
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
