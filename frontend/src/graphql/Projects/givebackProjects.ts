import { gql } from '@apollo/client';

const GIVEBACK_PROJECTS_QUERY = gql`
  query GivebackProjects {
    dataComponents {
      data {
        attributes {
          Project(filters: { link: { eq: "Giveback" } }) {
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

export default GIVEBACK_PROJECTS_QUERY;
