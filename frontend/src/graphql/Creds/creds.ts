import { gql } from '@apollo/client';

const CREDS_QUERY = gql`
  query Creds {
    creds {
      Cred {
        name
        contribution
        link
      }
    }
  }
`;

export default CREDS_QUERY;
