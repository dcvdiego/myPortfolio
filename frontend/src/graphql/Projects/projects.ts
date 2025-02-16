import { gql } from '@apollo/client';

const PROJECTS_QUERY = gql`
  query AllProjects {
    dataComponents {
      Project {
        name
        clientName
        slug
        startDate
        endDate
        link
        repo
        description
      }
    }
  }
`;

export default PROJECTS_QUERY;
