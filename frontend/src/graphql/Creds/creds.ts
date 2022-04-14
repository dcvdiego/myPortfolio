import { gql } from '@apollo/client';

const CREDS_QUERY = gql`
  query Creds {
    creds {
      data {
        attributes {
          Cred {
            name
            contribution
            link
          }
        }
      }
    }
  }
`;

export default CREDS_QUERY;
