import gql from 'graphql-tag';

export const GET_INFLUENCER_FOR_HOMESCREEN = gql`
  query {
    categoriesForHome(limit: 10) {
      id
      name
      total
      influencerProfiles {
        price
        id
        user {
          name
          intro
          avatarUrl
        }
        tags {
          id
          name
        }
        reviews {
          content
          user {
            name
          }
        }
      }
    }
  }
`;

export const GET_INFLUENCER = gql`
  query($id: ID!) {
    influencer(id: $id) {
      active
      category {
        id
        name
      }
      user {
        name
        email
        avatarUrl
        intro
      }
      price
      reviews {
        content
        user {
          name
        }
      }
      tags {
        id
        name
      }
    }
  }
`;
