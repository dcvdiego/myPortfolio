import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';

const CertificationsPage: NextPage = () => {
  return (
    <Layout title="Certifications">
      <Container>
        <Title>These are my Certifications</Title>
      </Container>
    </Layout>
  );
};
export default CertificationsPage;
