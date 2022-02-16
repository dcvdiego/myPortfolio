import tw, { styled, TwStyle } from 'twin.macro';

export const Container = styled.div`
  ${tw`
  flex 
  flex-col 
  w-full 
  h-screen 
  items-center
  overflow-x-hidden
  `}
`;

export const Title = styled.h1`
  ${tw`
  text-3xl 
  sm:text-4xl 
  font-semibold 
  tracking-wide 
  mb-12`}
`;

const linkStyles: Record<string, TwStyle> = {
  red: tw`text-red-500 
  hover:text-red-700`
};

export const Link = styled.a(({ color }) => [
  tw`block 
  md:inline 
  font-semibold 
  transition-colors 
  duration-300`,
  color && linkStyles[color]
]);
