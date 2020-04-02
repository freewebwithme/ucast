import React, {useState} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import globalStyles from '../styles/Global.js';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {useMutation} from '@apollo/react-hooks';
import {storage} from '../utils/Storage';
import {AuthContext} from '../navigations/AppNavigator';
import {Layout, Text, Button, Icon} from '@ui-kitten/components';
import {SIGN_IN_GOOGLE} from '../queries/UserQuery';

const bgImage = require('../assets/images/pic2.jpg');

async function googleSignIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    return {result: 'success', userInfo};
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User canceled login');
      return {result: 'canceled', message: '로그인을 취소했습니다.'};
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation is in progress already
      return {result: 'processing', message: '로그인이 진행중입니다.'};
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play services not available or outdated
      console.log('Play services not available');
      return {result: 'error', message: '로그인 도중에 문제가 발생했습니다.'};
    } else {
      console.log('other error occurred', error);
      return {result: 'error', message: '로그인 도중에 문제가 발생했습니다.'};
    }
  }
}

export function LandingScreen({navigation}) {
  const [error, setError] = useState(null);
  const {signIn} = React.useContext(AuthContext);

  /* Sign in with Google useMutation */
  const [sign_in_google, {loading}] = useMutation(SIGN_IN_GOOGLE, {
    async onCompleted(data) {
      if (data) {
        // save user token in AsyncStorage
        const token = data.googleSignIn.token;
        const user = data.googleSignIn.user;
        signIn(token, user);
      } else {
        console.log('No data');
      }
    },
    onError(loginError) {
      console.log('Printing google sign in error:', loginError.message);
      setError(loginError.message);
    },
  });

  if (loading) {
    console.log('Loading google sign in....');
  }

  const googleIcon = style => <Icon {...style} name="google" />;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          opacity: 1.0,
        }}>
        <Layout
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 6,
          }}>
          <Text style={styles.landingText} category="h1">
            소중한 사람에게
          </Text>
          <Text style={styles.landingText} category="h1">
            추억을 선물하세요
          </Text>
        </Layout>
        <Layout style={{...globalStyles.colContainer, flex: 2}}>
          <Button
            appearance="outline"
            icon={googleIcon}
            onPress={async () => {
              const result = await googleSignIn();
              if (result.result === 'success') {
                console.log(result.userInfo.idToken);
                try {
                  sign_in_google({
                    variables: {
                      idToken: result.userInfo.idToken,
                      name: result.userInfo.user.name,
                      avatarUrl: result.userInfo.user.photo,
                    },
                  });

                  return {
                    result: 'success',
                    message: '로그인에 성공했습니다.',
                  };
                } catch (e) {
                  return {
                    result: 'error',
                    message: '로그인 도중에 문제가 발생했습니다.',
                  };
                }
              } else if (result.result === 'canceled') {
                return {
                  result: 'canceled',
                  message: '로그인을 취소했습니다.',
                };
              } else if (result.result === 'processing') {
                return {result: 'processing', message: '로그인중 입니다.'};
              } else if (result.result === 'error') {
                return {
                  result: 'error',
                  message: '로그인 도중에 문제가 발생했습니다.',
                };
              } else {
                return {
                  result: 'error',
                  message: '로그인 도중에 문제가 발생했습니다.',
                };
              }
            }}>
            Google 로 접속하기
          </Button>
        </Layout>
        <Layout
          style={{
            ...globalStyles.rowContainer,
            flex: 1,
          }}>
          <Button
            appearance="ghost"
            onPress={() => {
              navigation.navigate('Login');
            }}>
            로그인
          </Button>
          <Text> or </Text>
          <Button
            appearance="ghost"
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            회원가입
          </Button>
        </Layout>
        <Layout style={{...styles.colContainer, flex: 1}}>
          <Text> {error} </Text>
        </Layout>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  landingText: {
    textAlign: 'center',
  },
});
