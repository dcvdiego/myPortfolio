import { gql } from '@apollo/client';

const CERTIFICATIONS_QUERY = gql`
  query AllCertifications {
    certifications {
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
`;

export default CERTIFICATIONS_QUERY;
