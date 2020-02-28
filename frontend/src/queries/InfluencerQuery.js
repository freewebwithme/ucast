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
