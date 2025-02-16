import { gql } from '@apollo/client';

const EXPERIENCES_QUERY = gql`
  query AllExperiences {
    experiences {
      name
      description
      startDate
      endDate
      role
      data_components {
        Project {
          name
          clientName
          slug
          startDate
          endDate
        }
        Testimonial {
          From
          Title
          Project
          Content
        }
      }
    }
  }
`;

export default EXPERIENCES_QUERY;
