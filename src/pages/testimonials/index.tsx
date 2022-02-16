import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';

const ProjectsPage: NextPage = () => {
  return (
    <Layout title="Projects">
      <Container>
        <Title>These are my testimonials</Title>
      </Container>
    </Layout>
  );
};
export default ProjectsPage;
