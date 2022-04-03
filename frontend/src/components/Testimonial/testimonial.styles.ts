import styled from 'styled-components';
import tw from 'twin.macro';

export const TestimonialContainer = styled.div`
  ${tw`
w-full
max-w-screen-2xl
flex
flex-col
items-center
justify-between
`}
`;
export const TestimonialTitle = styled.h2`
  ${tw`
    text-xl
`};
`;
export const TestimonialSubtitle = styled.h3`
  ${tw`
    text-lg
`}
`;
export const TestimonialContent = styled.p`
  ${tw`
    text-sm
`}
`;
