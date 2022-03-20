import React from 'react';
import Layout from '../../components/Layout';
import { Container, SubHeading, Title } from '../../styles/global.styles';
import WordCloud from '../../components/WordCloud';

const TestimonialsPage = () => {
  return (
    <Layout title="Testimonials">
      <Container>
        <Title>These are my testimonials</Title>
        <SubHeading>
          Click on a key word to reveal the quotes of colleagues below!
        </SubHeading>
        <WordCloud />
      </Container>
    </Layout>
  );
};
export default TestimonialsPage;
