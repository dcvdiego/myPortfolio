import React from 'react';
import ReadMore from '../ReadMore';
import {
  TestimonialContainer,
  TestimonialContent,
  TestimonialSubtitle,
  TestimonialTitle,
} from './testimonial.styles';
import { ITestimonialObject } from './testimonial.types';

interface IData {
  data: ITestimonialObject;
  word?: string | undefined;
}
const Testimonial = ({ data, word }: IData) => {
  return (
    <TestimonialContainer>
      <TestimonialTitle>{data.From}</TestimonialTitle>
      <TestimonialSubtitle>{data.Title}</TestimonialSubtitle>
      {word ? (
        <TestimonialContent>
          <ReadMore word={word}>{data.Content}</ReadMore>
        </TestimonialContent>
      ) : (
        <TestimonialContent>
          <ReadMore>{data.Content}</ReadMore>
        </TestimonialContent>
      )}
    </TestimonialContainer>
  );
};

export default Testimonial;
