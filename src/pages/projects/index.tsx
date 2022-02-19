import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';
import Project from '@/components/Project';
import projects from '../../assets/data/projects.json';

const ProjectsPage: NextPage = () => {
  return (
    <Layout title="Projects">
      <Container>
        <Title>These are my projects</Title>
        {projects.map((project) => (
          <Project data={project} />
        ))}
      </Container>
    </Layout>
  );
};
export default ProjectsPage;
