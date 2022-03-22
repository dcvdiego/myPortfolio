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
`}
`;
export const ProjectTitle = styled.h2`
  ${tw`
  text-lg
`};
`;
export const ProjectDates = styled.h3`
  ${tw`
  text-sm
`}
`;
export const ProjectDescription = styled.p`
  ${tw`
  text-xs
`}
`;
