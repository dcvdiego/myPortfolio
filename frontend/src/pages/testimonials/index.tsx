import React from 'react';
import Layout from '../../components/Layout';
import { Container, SubHeading, Title } from '../../styles/global.styles';
import WordCloud from '../../components/WordCloud';
import { useLazyQuery } from '@apollo/client';
import TESTIMONIAL_WORD_QUERY from '../../graphql/Testimonials/testimonialWord';
import Testimonial from '../../components/Testimonial';
import { ITestimonialObject } from '../../components/Testimonial/testimonial.types';

const TestimonialsPage = () => {
  const [getTestimonial, { loading, error, data, variables }] = useLazyQuery(
    TESTIMONIAL_WORD_QUERY
  );
  return (
    <Layout title="Testimonials">
      <Container>
        <Title>These are my testimonials</Title>
        <SubHeading>
          Click on a key word to reveal the quotes of colleagues below!
        </SubHeading>
        <WordCloud getTestimonial={getTestimonial} />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error, please contact me!</p>
        ) : (
          data?.dataComponents?.data[0].attributes.Testimonial.map(
            (testimonial: ITestimonialObject) => {
              return <Testimonial data={testimonial} word={variables!.word} />;
            }
          )
        )}
      </Container>
    </Layout>
  );
};
export default TestimonialsPage;
