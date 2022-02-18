import React, { useState } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';
import WordCloud from '@/components/WordCloud';
import { MyTestimonialContext } from './testimonials.context';
// import Testimonial from '@/components/Testimonial';
// import testimonials from '../../assets/data/testimonials.json';

const TestimonialsPage: NextPage = () => {
  const [activeWord, setActiveWord] = useState<string>('');
  return (
    <MyTestimonialContext.Provider value={{ activeWord, setActiveWord }}>
      <Layout title="Testimonials">
        <Container>
          <Title>These are my testimonials</Title>
          <WordCloud />
          {/* <Title>Or you can look at them below!</Title>
        {testimonials.map((testimonial) => (
          <Testimonial data={testimonial} />
        ))} */}
        </Container>
      </Layout>
    </MyTestimonialContext.Provider>
  );
};
export default TestimonialsPage;
