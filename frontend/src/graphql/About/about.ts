import { gql } from '@apollo/client';

const ABOUT_QUERY = gql`
  query About {
    about {
      data {
        attributes {
          Title
          Content
        }
      }
    }
  }
`;

export default ABOUT_QUERY;
