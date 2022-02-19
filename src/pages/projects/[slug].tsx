import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';
import projects from '../../assets/data/projects.json';

const Project: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  // replace with GraphQL query on a NoSQL database?
  const project = projects.find(
    (project) => project.slug === slug || project.name === slug
  );
  return (
    <Layout title={project?.name as string}>
      <Container>
        <Title>{project?.name}</Title>
      </Container>
    </Layout>
  );
};
export default Project;
