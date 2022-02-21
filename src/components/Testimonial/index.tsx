import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const TestimonialContainer = styled.div`
  ${tw`
w-full
max-w-screen-2xl
flex
flex-col
items-center
justify-between
`}
`;
const TestimonialTitle = styled.h2`
  ${tw`
    text-lg
`};
`;
const TestimonialSubtitle = styled.h3`
  ${tw`
    text-sm
`}
`;
const TestimonialContent = styled.p`
  ${tw`
    text-xs
`}
`;
interface ITestimonialObject {
  from: string;
  project: string;
  title: string;
  content: string;
}
interface IData {
  data: ITestimonialObject;
  // eslint-disable-next-line react/require-default-props
  word?: string;
}
const Testimonial = ({ data, word }: IData) => {
  return (
    <TestimonialContainer>
      <TestimonialTitle>{data.from}</TestimonialTitle>
      <TestimonialSubtitle>{data.title}</TestimonialSubtitle>
      <TestimonialContent
        dangerouslySetInnerHTML={{
          __html: data.content.replaceAll(word, `<b>${word}</b>`)
        }}
      />
    </TestimonialContainer>
  );
};

export default Testimonial;
