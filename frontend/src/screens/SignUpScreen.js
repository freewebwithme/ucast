import React, {useState} from 'react';
import {KeyboardAvoidingView, View, StyleSheet} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import formStyles from '../styles/FormStyles';
import {validateEmailLength, validateEmailFormat} from '../utils/Validators';
import gql from 'graphql-tag';
import {storage} from '../utils/Storage';
import {UserTokenContext} from '../navigations/AppNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {Layout, Text, Button, Input} from '@ui-kitten/components';
import {LoadingIcon, LogInIcon, RightArrowIcon} from '../styles/Icons';

const Stack = createStackNavigator();

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
function NameScreen({navigation}) {
  const [name, setName] = useState('');
  storage.set('name', name);

  const validName = name.length > 2 && name.length < 10;

  return (
    <Layout style={styles.mainContainer}>
      <KeyboardAvoidingView enabled>
        <Layout style={formStyles.formView}>
          <Text style={{marginBottom: 10}}>Step 1 of 3</Text>
          <Text style={{marginBottom: 25}} category="h5">
            이름을 입력하세요
          </Text>
          <Input
            label="이름"
            style={formStyles.textInput}
            status={validName ? 'success' : 'danger'}
            caption={validName ? '' : '이름 형식에 어긋납니다.'}
            placeholder="홍길동"
            onChangeText={text => setName(text)}
          />
          <Button
            disabled={!validName}
            appearance="outline"
            style={{marginTop: 15, flexDirection: 'row-reverse'}}
            icon={RightArrowIcon}
            onPress={e => {
              e.preventDefault();
              navigation.navigate('EmailScreen');
            }}>
            계속하기
          </Button>
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  );
}

function EmailScreen({navigation}) {
  const [email, setEmail] = useState('');
  storage.set('email', email);
  const validEmail = validateEmailLength(email) && validateEmailFormat(email);
  return (
    <Layout style={styles.mainContainer}>
      <KeyboardAvoidingView enabled>
        <Layout style={formStyles.formView}>
          <Text style={{marginBottom: 10}}>Step 2 of 3</Text>
          <Text style={{marginBottom: 25}} category="h5">
            이메일을 입력하세요
          </Text>
          <Input
            label="이메일"
            style={formStyles.textInput}
            status={validEmail ? 'success' : 'danger'}
            caption={validEmail ? '' : '올바른 이메일 형식을 사용하세요'}
            placeholder="john@example.com"
            onChangeText={text => setEmail(text)}
          />
          <Button
            appearance="outline"
            disabled={!validEmail}
            icon={RightArrowIcon}
            style={{marginTop: 15, flexDirection: 'row-reverse'}}
            onPress={e => {
              e.preventDefault();
              navigation.navigate('PasswordScreen');
            }}>
            계속하기
          </Button>
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  );
}

function PasswordScreen({navigation}) {
  let info = new Map();
  const userTokenContext = React.useContext(UserTokenContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [signUp, {loading}] = useMutation(SIGNUP_NEW_USER, {
    onCompleted(data) {
      console.log('Signup successful: ', data);
      const token = data.signup.token;
      storage.remove('name');
      storage.remove('email');
      info = new Map();
      storage.set('userToken', token);
      userTokenContext(token);
      navigation.navigate('Home');
    },
    onError(error) {
      console.log('Sign up error:', error.message);
      setError(error.message);
    },
  });
  storage.get('name').then(name => info.set('name', name));
  storage.get('email').then(email => info.set('email', email));

  // save password in info map temporarily
  info.set('password', password);

  return (
    <Layout style={styles.mainContainer}>
      <KeyboardAvoidingView enabled>
        <Layout style={formStyles.formView}>
          <Text style={{marginBottom: 10}}>Step 3 of 3</Text>
          <Text style={{marginBottom: 25}} category="h5">
            비밀번호를 입력하세요.
          </Text>
          <Input
            label="비밀번호"
            secureTextEntry={true}
            style={formStyles.textInput}
            placeholder="********"
            onChangeText={text => setPassword(text)}
          />
          <Button
            appearance="outline"
            disabled={!password}
            style={{marginTop: 15}}
            icon={loading ? LoadingIcon : LogInIcon}
            onPress={e => {
              e.preventDefault();

              console.log(info);
              signUp({
                variables: {
                  email: info.get('email'),
                  name: info.get('name'),
                  password: info.get('password'),
                },
              });
            }}>
            가입하기
          </Button>
          {error && (
            <Text
              style={{marginTop: 10, color: 'red'}}
              status="danger"
              category="c2">
              {error}
            </Text>
          )}
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
  },
});

export function SignUpStack() {
  return (
    <Stack.Navigator initialRouteName="NameScreen" headerMode="none">
      <Stack.Screen name="NameScreen" component={NameScreen} />
      <Stack.Screen name="EmailScreen" component={EmailScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
    </Stack.Navigator>
  );
}
