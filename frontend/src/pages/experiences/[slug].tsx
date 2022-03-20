import React from 'react';

import Layout from '../..//components/Layout';
import { Container, Title } from '../../styles/global.styles';
import { useParams } from 'react-router-dom';

const Experience = () => {
  let { slug } = useParams();
  return (
    <Layout title={slug as string}>
      <Container>
        <Title>{slug}</Title>
      </Container>
    </Layout>
  );
};
export default Experience;
