import { gql } from '@apollo/client';

const CERTIFICATIONS_TYPE_QUERY = gql`
  query CertificationType($type: String) {
    certifications {
      Certification(filters: { type: { eq: $type } }) {
        threedid
        name
        awardingBody
        description
        date
        shape
        type
      }
    }
  }
`;

export default CERTIFICATIONS_TYPE_QUERY;
