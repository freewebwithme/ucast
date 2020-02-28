import gql from 'graphql-tag';

export const UPDATE_ME = gql`
  mutation($email: String, $name: String, $intro: String, $avatarUrl: String) {
    updateMe(email: $email, name: $name, intro: $intro, avatarUrl: $avatarUrl) {
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
      name
      avatarUrl
      email
      intro
    }
  }
`;
