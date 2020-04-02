import gql from 'graphql-tag';

export const UPDATE_ME = gql`
  mutation($email: String, $name: String, $intro: String, $avatarUrl: String) {
    updateMe(email: $email, name: $name, intro: $intro, avatarUrl: $avatarUrl) {
      id
      name
      email
      intro
      avatarUrl
    }
  }
`;

export const GET_USER_INFO = gql`
  query {
    me {
      id
      name
      avatarUrl
      email
      intro
    }
  }
`;

export const SIGN_IN_GOOGLE = gql`
  mutation($idToken: String!, $name: String!, $avatarUrl: String!) {
    googleSignIn(idToken: $idToken, name: $name, avatarUrl: $avatarUrl) {
      token
      user {
        id
        email
        name
        avatarUrl
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        id
        name
        email
        avatarUrl
      }
      token
    }
  }
`;

export const SIGNUP_NEW_USER = gql`
  mutation($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      user {
        id
        name
        email
        avatarUrl
      }
      token
    }
  }
`;
