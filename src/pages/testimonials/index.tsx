import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';
import WordCloud from '@/components/WordCloud';

const TestimonialsPage: NextPage = () => {
  return (
    <Layout title="Testimonials">
      <Container>
        <Title>These are my testimonials</Title>
        <WordCloud />
      </Container>
    </Layout>
  );
};
export default TestimonialsPage;
