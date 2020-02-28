import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Layout, Text, Button, Input, Avatar} from '@ui-kitten/components';
import globalStyles from '../../styles/Global';
import {CheckmarkCircleIcon, CloseCircleIcon} from '../../styles/Icons';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const UPDATE_ME = gql`
  mutation($email: String, $name: String, $intro: String, $avatarUrl: String) {
    updateMe(email: $email, name: $name, intro: $intro, avatarUrl: $avatarUrl) {
      name
      email
      intro
      avatarUrl
    }
  }
`;

const GET_USER_INFO = gql`
  query {
    me {
      name
      avatarUrl
      email
      intro
    }
  }
`;

export function EditProfileScreen({route, navigation}) {
  /* Get parameters from ProfileScreen
     me -> user schema
     refetch -> refetch() from useQuery() in ProfileScreen */
  const {me} = route.params;

  console.log('Inspecting params', route.params);
  const [email, setEmail] = React.useState(me.email);
  const [name, setName] = React.useState(me.name);
  const [intro, setIntro] = React.useState(me.intro);
  const [avatarUrl, setAvatarUrl] = React.useState(me.avatarUrl);

  const [errorOnUpdate, setErrorOnUpdate] = React.useState('');
  const [updateMe, {loading, client}] = useMutation(UPDATE_ME, {
    onCompleted(data) {
      console.log('Me updated completed');
    },
    onError(error) {
      console.log('Printing update me error', error.message);
      setErrorOnUpdate(error.message);
    },
    refetchQueries: [{query: GET_USER_INFO}],
  });

  if (loading) {
    console.log('Upading...');
    return <Text>Updating....</Text>;
  }

  return (
    <Layout style={styles.mainContainer}>
      <Layout style={globalStyles.colContainer}>
        <Avatar
          size="giant"
          source={{uri: me.avatarUrl}}
          style={{width: 200, height: 200, marginBottom: 50}}
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
