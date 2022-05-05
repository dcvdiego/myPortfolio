import tw, { styled } from 'twin.macro';

export const UIBottomContainer = styled.div`
  ${tw`
absolute 
flex 
items-center 
justify-center 
flex-row
`}
  z-index: 1000;
  bottom: 0rem;
`;
export const UITopContainer = styled.div`
  ${tw`
absolute 
flex 
items-center 
justify-center 
flex-row
`}
  z-index: 1000;
  right: 0;
`;
