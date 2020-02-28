import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/Global';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {Layout, Avatar, Button, Text, Card} from '@ui-kitten/components';
import {
  EditIcon,
  HeartIcon,
  CardIcon,
  TvIcon,
  BellIcon,
  LockIcon,
  FileTextIcon,
} from '../../styles/Icons';

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

const avatarClick = () => {
  console.log('Avatar clicked');
};
export function ProfileScreen(props) {
  const {loading, error, data, refetch} = useQuery(GET_USER_INFO);
  const userInfo = data;
  const {navigation} = props;

  console.log('Inspecting refetch', refetch);
  if (error) return <Text>{error.message}</Text>;
  if (loading) return <Text>Loading...</Text>;
  return (
    <Layout style={{...globalStyles.colContainer, flex: 1}}>
      <Layout
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => avatarClick()}>
          <Avatar size="giant" source={{uri: userInfo.me.avatarUrl}} />
        </TouchableOpacity>
        <Text style={styles.name}>{data && userInfo.me.name}</Text>
        {userInfo.me.intro && (
          <Card style={{margin: 20}}>
            <Text>{userInfo.me.intro}</Text>
          </Card>
        )}
      </Layout>
      <Layout style={{...globalStyles.rowContainer, flex: 0.5}}>
        <Button
          onPress={() => navigation.navigate('Edit', {me: userInfo.me})}
          style={styles.margin5Button}
          appearance="ghost"
          icon={EditIcon}>
          수정하기
        </Button>
        <Button
          style={styles.margin5Button}
          appearance="ghost"
          icon={HeartIcon}>
          위시리스트
        </Button>
      </Layout>
      <Layout style={{justifyContent: 'center', flex: 2}}>
        <Button
          style={styles.fullWidthButton}
          appearance="outline"
          icon={CardIcon}
          status="info">
          결제방법 보기
        </Button>
        <Button
          style={styles.fullWidthButton}
          appearance="outline"
          icon={TvIcon}
          status="info">
          까메오 기록 보기
        </Button>
        <Button
          style={styles.fullWidthButton}
          appearance="outline"
          icon={BellIcon}
          status="info">
          알람설정보기
        </Button>
        <Button
          style={styles.fullWidthButton}
          appearance="outline"
          icon={LockIcon}
          status="info">
          Security & Privacy
        </Button>
        <Button
          style={styles.fullWidthButton}
          appearance="outline"
          icon={FileTextIcon}
          status="info">
          Terms & Service
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  avatar: {
    margin: 20,
  },
  margin5Button: {
    margin: 5,
  },
  fullWidthButton: {
    width: 300,
    marginBottom: 10,
  },
});
