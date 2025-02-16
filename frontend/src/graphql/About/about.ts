import { gql } from '@apollo/client';

const ABOUT_QUERY = gql`
  query About {
    about {
      Title
      Content
    }
  }
`;

export default ABOUT_QUERY;
