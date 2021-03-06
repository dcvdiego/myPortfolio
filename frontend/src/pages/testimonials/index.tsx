import React from 'react';
import Layout from '../../components/Layout';
import {
  Container,
  Loader,
  SubHeading,
  Title,
} from '../../styles/global.styles';
import WordCloud from '../../components/WordCloud';
import { useLazyQuery, useQuery } from '@apollo/client';
import TESTIMONIAL_WORD_QUERY from '../../graphql/Testimonials/testimonialWord';
import Testimonial from '../../components/Testimonial';
import { ITestimonialObject } from '../../components/Testimonial/testimonial.types';
import tw, { styled } from 'twin.macro';
import { Marginer } from '../../components/Marginer';
import { isMobile } from 'react-device-detect';
import { TestimonialSubtitle } from '../../components/Testimonial/testimonial.styles';
import TESTIMONIALS_QUERY from '../../graphql/Testimonials/testimonials';

const CloudContainer = styled.div`
  ${tw`
    flex
    flex-row
  `}
  height: 40vw;
  min-height: 40vw;
`;

const TestimonialContainer = styled.div`
  ${tw`
  w-full
  flex-col
  mr-36
  // overflow-hidden
  `}
`;

const CloudContainerMobile = styled.div`
  ${tw`
  flex
  flex-col
  p-20
  `}
`;

const TestimonialsPage = () => {
  if (!isMobile) {
    var [getTestimonial, { loading, error, data, variables }] = useLazyQuery(
      TESTIMONIAL_WORD_QUERY
    );
  } else {
    var { loading, error, data } = useQuery(TESTIMONIALS_QUERY);
  }
  return (
    <Layout title="Testimonials">
      <Container>
        <Title>These are my testimonials</Title>
        {!isMobile ? (
          <CloudContainer>
            <WordCloud getTestimonial={getTestimonial} />
            <TestimonialContainer>
              {loading ? (
                <Loader />
              ) : error ? (
                <p>Error, please contact me!</p>
              ) : data ? (
                data?.dataComponents?.data[0].attributes.Testimonial.map(
                  (testimonial: ITestimonialObject) => {
                    return (
                      <>
                        <Testimonial
                          data={testimonial}
                          word={variables?.word}
                        />

                        <Marginer direction="vertical" margin="2rem" />
                      </>
                    );
                  }
                )
              ) : (
                <SubHeading>
                  Click on a key word to reveal the quotes of colleagues below!
                </SubHeading>
              )}
            </TestimonialContainer>
          </CloudContainer>
        ) : (
          <CloudContainerMobile>
            <TestimonialSubtitle>
              Unfortunately, onClick does not work in mobile for three.js. So
              see all of my testimonials below
            </TestimonialSubtitle>
            <WordCloud getTestimonial={getTestimonial} />
            <TestimonialContainer>
              {loading ? (
                <Loader />
              ) : error ? (
                <p>Error, please contact me!</p>
              ) : data ? (
                data?.dataComponents?.data[0].attributes.Testimonial.map(
                  (testimonial: ITestimonialObject) => {
                    return (
                      <>
                        <Testimonial data={testimonial} />
                        <Marginer direction="vertical" margin="2rem" />
                      </>
                    );
                  }
                )
              ) : (
                <SubHeading>
                  Click on a key word to reveal the quotes of colleagues below!
                </SubHeading>
              )}
            </TestimonialContainer>
          </CloudContainerMobile>
        )}
      </Container>
    </Layout>
  );
};
export default TestimonialsPage;
