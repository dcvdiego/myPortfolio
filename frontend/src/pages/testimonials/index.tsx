import React from 'react';
import Layout from '../../components/Layout';
import { Container, SubHeading, Title } from '../../styles/global.styles';
import WordCloud from '../../components/WordCloud';
import { useLazyQuery } from '@apollo/client';
import TESTIMONIAL_WORD_QUERY from '../../graphql/Testimonials/testimonialWord';
import Testimonial from '../../components/Testimonial';
import { ITestimonialObject } from '../../components/Testimonial/testimonial.types';
import tw, { styled } from 'twin.macro';

const CloudContainer = styled.div`
  ${tw`
    flex
    flex-row
    
  `}
  height: inherit;
`;

const TestimonialsPage = () => {
  const [getTestimonial, { loading, error, data, variables }] = useLazyQuery(
    TESTIMONIAL_WORD_QUERY
  );
  return (
    <Layout title="Testimonials">
      <Container>
        <Title>These are my testimonials</Title>

        <CloudContainer>
          <WordCloud getTestimonial={getTestimonial} />
          <div style={{ width: '100%', flexDirection: 'column' }}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error, please contact me!</p>
            ) : data ? (
              data?.dataComponents?.data[0].attributes.Testimonial.map(
                (testimonial: ITestimonialObject) => {
                  return (
                    <Testimonial data={testimonial} word={variables!.word} />
                  );
                }
              )
            ) : (
              <SubHeading>
                Click on a key word to reveal the quotes of colleagues below!
              </SubHeading>
            )}
          </div>
        </CloudContainer>
      </Container>
    </Layout>
  );
};
export default TestimonialsPage;
