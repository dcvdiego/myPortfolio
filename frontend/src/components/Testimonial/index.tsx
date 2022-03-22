import React from 'react';
import {
  TestimonialContainer,
  TestimonialContent,
  TestimonialSubtitle,
  TestimonialTitle,
} from './testimonial.styles';
import { ITestimonialObject } from './testimonial.types';

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
