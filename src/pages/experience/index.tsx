import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';

const ExperiencesPage: NextPage = () => {
  return (
    <Layout title="Experiences">
      <Container>
        <Title>These are my Experiences</Title>
      </Container>
    </Layout>
  );
};
export default ExperiencesPage;
