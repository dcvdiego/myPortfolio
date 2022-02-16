import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';

const Certification: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Layout title={slug as string}>
      <Container>
        <Title>{slug}</Title>
      </Container>
    </Layout>
  );
};
export default Certification;
