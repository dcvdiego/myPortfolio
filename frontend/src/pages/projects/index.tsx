import React from 'react';

import Layout from '../../components/Layout';
import { Container, Title } from '../../styles/global.styles';
import Project from '../../components/Project';
// import projects from '../../assets/data/projects.json';
import PROJECTS_QUERY from '../../graphql/Projects/projects';
import { useQuery } from '@apollo/client';

const ProjectsPage = ({ ...props }) => {
  const { screen, componentData } = props;
  let finalData, finalLoading, finalError;
  if (screen) {
    finalData = componentData;
  } else {
    const { loading, error, data } = useQuery(PROJECTS_QUERY);
    finalLoading = loading;
    finalError = error;
    finalData = data;
  }
  // TODO: when there is more than one experience it is not only data[0], when I finish Pre-University I need to take that off...
  const projects = finalData?.dataComponents.data[0].attributes.Project;
  return (
    <Layout title="Projects" screen={screen}>
      <Container>
        <Title>These are my {screen && 'giveback'} projects</Title>
        {!finalLoading &&
          !finalError &&
          projects.map((project: any) => (
            <Project data={project} screen={screen} />
          ))}
      </Container>
    </Layout>
  );
};
export default ProjectsPage;
