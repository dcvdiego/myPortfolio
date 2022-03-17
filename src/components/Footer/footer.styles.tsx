import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw, { TwStyle } from 'twin.macro';

export const FooterContainer = styled.div`
  /* min-height: 24em; */
  /* background-color: rgb(34 9 79); */
  ${tw`
  bg-gray-800
    flex
    flex-col
    min-w-full
    pt-8
    md:pt-16
    items-center
    justify-center
    `};
`;

export const InnerContainer = styled.div`
  ${tw`
    flex
    w-full
    h-full
    max-w-screen-2xl
    flex-wrap
`};
`;

export const BottomContainer = styled.div`
  ${tw`
    w-full
    flex
    max-w-screen-2xl
    justify-center
    md:justify-start
    mt-7
    md:mt-1
    `};
`;

export const CopyrightText = styled.span`
  font-size: 12px;
  ${tw`
    text-gray-300
    `};
`;

export const AboutContainer = styled.div`
  ${tw`
    flex
    flex-col
    mr-2
    md:mr-16
    pl-10
    pr-10
    md:pl-3
    md:pr-3
    `};
`;

export const AboutText = styled.p`
  ${tw`
    text-white
    text-sm
    font-normal
    max-w-sm
    leading-5
    mt-2
    `};
`;

export const SectionContainer = styled.div`
  ${tw`
  w-full
  md:w-auto
    flex
    flex-col
    mr-2
    md:mr-16
    pl-10
    pr-10
    md:pl-3
    md:pr-3
    mt-7
    md:mt-0
    `}
`;

export const LinksList = styled.ul`
  ${tw`
    outline-none
    list-none
    flex
    flex-col
    `};
`;

export const ListItem = styled.li`
  ${tw`
    mb-3
    `};
  & > a {
    ${tw`
    text-sm
    text-white
    transition-all
    hover:text-gray-200
        `};
  }
`;

export const HeaderTitle = styled.h3`
  ${tw`
    text-xl
    font-bold
    text-white
    mb-3
    `};
`;

export const HorizontalContainer = styled.div`
  ${tw`
    flex
    items-center 
    `};
`;
export const HorizontalTag = styled(Link)`
  ${tw`
  flex
  `}
`;
export const iconStyles: Record<string, TwStyle> = {
  blue: tw`
  bg-blue-700
  hover:bg-blue-600
  `,
  orange: tw`
bg-orange-600
hover:bg-orange-400
`,
  green: tw`
bg-green-500
hover:bg-green-400
`,
  red: tw`
bg-red-700
hover:bg-red-800
`,
};

export const ColoredIcon = styled.span(({ color }) => [
  tw`
  w-8
    h-8
    rounded-full
    flex
    items-center
    justify-center
    text-white
    text-base
    mr-2
    `,
  color && iconStyles[color],
]);
export const SmallText = styled.h6`
  ${tw`
    text-sm
    text-white
    `};
`;
