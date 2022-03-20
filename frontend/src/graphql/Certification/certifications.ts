import { gql } from '@apollo/client';

const CERTIFICATIONS_QUERY = gql`
  query AllCertifications {
    certifications {
      data {
        attributes {
          Certification {
            threedid
            name
            awardingBody
            description
            date
            shape
          }
        }
      }
    }
  }
`;

export default CERTIFICATIONS_QUERY;
