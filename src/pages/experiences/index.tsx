import React from 'react';

import Layout from '../..//components/Layout';
import { Container, Title } from '../../styles/global.styles';
import Experience from '../../components/Experience';
import experiences from '../../assets/data/experiences.json';

const ExperiencesPage = () => {
  return (
    <Layout title="Experiences">
      <Container>
        <Title>These are my Experiences</Title>
        {experiences.map((experience) => (
          <Experience data={experience} />
        ))}
      </Container>
    </Layout>
  );
};
export default ExperiencesPage;
