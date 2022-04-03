import tw, { styled } from 'twin.macro';

export const UIContainer = styled.div`
  ${tw`
absolute 
flex 
items-center 
justify-center 
flex-row
`}
  z-index: 1000;
  bottom: -5rem;
`;
