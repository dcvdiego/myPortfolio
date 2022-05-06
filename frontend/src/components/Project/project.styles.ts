import styled from 'styled-components';
import tw from 'twin.macro';
export const ProjectContainer = styled.div`
  ${tw`
w-full
max-w-screen-2xl
flex
flex-col
items-center
justify-between
m-8
`}
`;
export const ProjectTitle = styled.h2`
  ${tw`
  text-2xl
  underline
`};
`;
export const ProjectClient = styled.h2`
  ${tw`
text-xl
`}
`;
export const ProjectDates = styled.h3`
  ${tw`
  text-base
`}
`;
export const ProjectDescription = styled.p`
  ${tw`
  text-sm
`}
`;
