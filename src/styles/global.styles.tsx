import tw, { styled, TwStyle } from 'twin.macro';

export const Container = styled.div`
  ${tw`
  flex 
  flex-col 
  w-full
  h-screen 
  items-center
  overflow-x-hidden
  bg-black
  text-white
  pt-4
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

export const SubHeading = styled.h3`
  ${tw`
    text-xl
    sm:text-2xl
    font-medium
    tracking-wide
    mb-12
  `}
`;

export const Button = styled.button`
  ${tw`
  bg-gray-500
  p-4
  m-6
  `}
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
