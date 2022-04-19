import styled from 'styled-components';
import tw, { TwStyle } from 'twin.macro';

export const Container = styled.div<{ lightMode?: boolean }>`
  background-color: ${(props) => (props.lightMode ? 'white' : 'black')};
  ${tw`
  flex 
  flex-col 
  w-full
  min-h-screen
  items-center
  text-white
  pt-4
  `};
`;

export const Title = styled.h1<{ noMargin?: boolean }>`
  margin-bottom: ${(props) => (props.noMargin ? 0 : '3rem')};
  ${tw`
  text-3xl 
  sm:text-4xl 
  font-semibold 
  tracking-wide 
  `}
`;

export const SubHeading = styled.h3<{ lightMode?: boolean }>`
  color: ${(props) => (props.lightMode ? 'black' : 'white')};
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
  hover:text-red-700`,
};

export const Link = styled.a(({ color }) => [
  tw`block 
  md:inline 
  font-semibold 
  transition-colors 
  duration-300`,
  color && linkStyles[color],
]);
