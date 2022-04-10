import React from 'react';

import Layout from '../../components/Layout';
import { Container, Title } from '../../styles/global.styles';
import Project from '../../components/Project';
// import projects from '../../assets/data/projects.json';
import PROJECTS_QUERY from '../../graphql/Project/projects';
import { useQuery } from '@apollo/client';

const ProjectsPage = () => {
  const { loading, error, data } = useQuery(PROJECTS_QUERY);
  const projects = data?.dataComponents.data[0].attributes.Project;
  return (
    <Layout title="Projects">
      <Container>
        <Title>These are my projects</Title>
        {!loading &&
          !error &&
          projects.map((project: any) => <Project data={project} />)}
      </Container>
    </Layout>
  );
};
export default ProjectsPage;
