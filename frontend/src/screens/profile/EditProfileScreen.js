import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Layout, Text, Button, Input, Avatar} from '@ui-kitten/components';
import globalStyles from '../../styles/Global';
import {CheckmarkCircleIcon, CloseCircleIcon} from '../../styles/Icons';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_ME, GET_USER_INFO} from '../../queries/UserQuery';

export function EditProfileScreen({route, navigation}) {
  /* Get user info from Profile page for
     init value for state */
  const {savedMe} = route.params;

  const [email, setEmail] = React.useState(savedMe.email);
  const [name, setName] = React.useState(savedMe.name);
  const [intro, setIntro] = React.useState(savedMe.intro);
  const [avatarUrl, setAvatarUrl] = React.useState(savedMe.avatarUrl);
  const [errorOnUpdate, setErrorOnUpdate] = React.useState('');

  const [updateMe, {loading, client}] = useMutation(UPDATE_ME, {
    onCompleted(data) {
      console.log('Me updated completed');
      navigation.goBack();
    },
    onError(error) {
      console.log('Printing update me error', error.message);
      setErrorOnUpdate(error.message);
    },
    refetchQueries: [{query: GET_USER_INFO}],
  });

  //if (loading) {
  //  console.log('Upading...');
  //  return <Text>Updating....</Text>;
  //}

  const {me} = client.readQuery({query: GET_USER_INFO});

  return (
    <Layout style={styles.mainContainer}>
      <Layout style={globalStyles.colContainer}>
        <Avatar
          size="giant"
          source={{uri: me.avatarUrl}}
          style={{width: 150, height: 150, marginBottom: 50}}
        />
        <Input
          label="이름"
          style={styles.marginTop20}
          onChangeText={nameInput => setName(nameInput)}>
          {me.name}
        </Input>
        <Input
          label="이메일"
          style={styles.marginTop20}
          onChangeText={emailInput => setEmail(emailInput)}>
          {me.email}
        </Input>
        <Input
          label="소개"
          size="large"
          style={styles.marginTop20}
          onChangeText={introInput => setIntro(introInput)}>
          {me.intro}
        </Input>
      </Layout>
      <Layout
        style={{
          ...globalStyles.rowContainer,
          justifyContent: 'space-between',
          marginTop: 30,
        }}>
        <Button
          status="danger"
          icon={CloseCircleIcon}
          appearance="outline"
          onPress={() => navigation.goBack()}>
          수정취소
        </Button>
        <Button
          icon={CheckmarkCircleIcon}
          appearance="outline"
          onPress={e => {
            e.preventDefault();
            updateMe({
              variables: {
                email: email,
                name: name,
                intro: intro,
                avatarUrl: avatarUrl,
              },
            });
          }}>
          수정완료
        </Button>
      </Layout>
      <Text>{errorOnUpdate}</Text>
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
  marginTop20: {
    marginTop: 20,
  },
});
