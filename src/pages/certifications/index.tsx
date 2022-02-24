import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';
import Certification from '@/components/Certification';
import certifications from '../../assets/data/certifications.json';
import tw, { styled } from 'twin.macro';

const CertificationContainer = styled.div`
  ${tw`
  flex
  flex-row
`}
`;

const CertificationsPage: NextPage = () => {
  return (
    <Layout title="Certifications">
      <Container>
        <Title>These are my Certifications and Skills</Title>
        <CertificationContainer>
          {certifications.map((certification) => {
            return <Certification data={certification} />;
          })}
        </CertificationContainer>
      </Container>
    </Layout>
  );
};
export default CertificationsPage;
