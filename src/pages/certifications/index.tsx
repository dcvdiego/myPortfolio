import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';
import Certification from '@/components/Certification';

const CertificationsPage: NextPage = () => {
  return (
    <Layout title="Certifications">
      <Container>
        <Title>These are my Certifications and Skills</Title>
        <Certification />
      </Container>
    </Layout>
  );
};
export default CertificationsPage;
