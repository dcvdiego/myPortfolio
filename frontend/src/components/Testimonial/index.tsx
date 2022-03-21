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
  From: string;
  Project: string;
  Title: string;
  Content: string;
}
interface IData {
  data: ITestimonialObject;
  word?: string | null;
}
const Testimonial = ({ data, word }: IData) => {
  return (
    <TestimonialContainer>
      <TestimonialTitle>{data.From}</TestimonialTitle>
      <TestimonialSubtitle>{data.Title}</TestimonialSubtitle>
      {word ? (
        <TestimonialContent
          dangerouslySetInnerHTML={{
            __html: data.Content.replaceAll(word, `<b>${word}</b>`),
          }}
        />
      ) : (
        <TestimonialContent>{data.Content}</TestimonialContent>
      )}
    </TestimonialContainer>
  );
};

export default Testimonial;
