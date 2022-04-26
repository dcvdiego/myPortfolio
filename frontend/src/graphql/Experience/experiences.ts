import { gql } from '@apollo/client';

const EXPERIENCES_QUERY = gql`
  query AllExperiences {
    experiences {
      data {
        attributes {
          name
          description
          startDate
          endDate
          role
          data_components {
            data {
              attributes {
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
        }
      }
    }
  }
`;

export default EXPERIENCES_QUERY;
