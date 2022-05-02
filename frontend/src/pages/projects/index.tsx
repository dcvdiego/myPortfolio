import React, { useEffect } from 'react';

import Layout from '../../components/Layout';
import { Container, Loader, Title } from '../../styles/global.styles';
import Project from '../../components/Project';
// import projects from '../../assets/data/projects.json';
import PROJECTS_QUERY from '../../graphql/Projects/projects';
import { useQuery } from '@apollo/client';

const ProjectsPage = ({ ...props }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
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
        {finalLoading && <Loader />}
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
