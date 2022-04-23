import { gql } from '@apollo/client';

const PROJECT_QUERY = gql`
  query Project($slug: String) {
    dataComponents {
      data {
        attributes {
          Project(filters: { slug: { eq: $slug } }) {
            name
            clientName
            slug
            infrastructure
            clientSize
            projectSize
            startDate
            endDate
            link
            repo
            description
            preview {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default PROJECT_QUERY;
