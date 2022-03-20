import React from 'react';

import Layout from '../..//components/Layout';
import { Container } from '../../styles/global.styles';
import ExperienceApp from '../../components/ExperienceApp';

const ExperiencesPage = () => {
  return (
    <Layout title="Experiences">
      <Container>
        <ExperienceApp />
      </Container>
    </Layout>
  );
};
export default ExperiencesPage;
