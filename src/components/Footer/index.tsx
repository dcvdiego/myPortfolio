import {
  faCodeBranch,
  faEnvelope,
  faPhoneAlt,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import tw from 'twin.macro';
// import { Logo } from '../logo';

const FooterContainer = styled.div`
  /* min-height: 24em; */
  background-color: rgb(34 9 79);
  ${tw`
    flex
    flex-col
    min-w-full
    pt-8
    md:pt-16
    items-center
    justify-center
    `};
`;

const InnerContainer = styled.div`
  ${tw`
    flex
    w-full
    h-full
    max-w-screen-2xl
    flex-wrap
`};
`;

const BottomContainer = styled.div`
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

const CopyrightText = styled.span`
  font-size: 12px;
  ${tw`
    text-gray-300
    `};
`;

const AboutContainer = styled.div`
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

const AboutText = styled.p`
  ${tw`
    text-white
    text-sm
    font-normal
    max-w-sm
    leading-5
    mt-2
    `};
`;

const SectionContainer = styled.div`
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

const LinksList = styled.ul`
  ${tw`
    outline-none
    list-none
    flex
    flex-col
    `};
`;

const ListItem = styled.li`
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

const HeaderTitle = styled.h3`
  ${tw`
    text-xl
    font-bold
    text-white
    mb-3
    `};
`;

const HorizontalContainer = styled.div`
  ${tw`
    flex
    items-center
    `};
`;

const PurpleIcon = styled.span`
  ${tw`
    w-8
    h-8
    rounded-full
    bg-purple-500
    flex
    items-center
    justify-center
    text-white
    text-base
    mr-2
    `};
`;
const SmallText = styled.h6`
  ${tw`
    text-sm
    text-white
    `};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <InnerContainer>
        <AboutContainer>
          {/* <Logo color="white" /> */}
          <AboutText>
            This is my portfolio websites where I will showcase my journey in
            development
          </AboutText>
        </AboutContainer>
        <SectionContainer>
          <LinksList>
            <HeaderTitle>Get Started</HeaderTitle>
            <ListItem>
              <Link href="/">
                {/* eslint-disable-next-line */}
                <a>Home</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/certifications">
                {/* eslint-disable-next-line */}
                <a>Certifications</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/projects">
                {/* eslint-disable-next-line */}
                <a>Projects</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/experience">
                {/* eslint-disable-next-line */}
                <a>Experience</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/testimonials">
                {/* eslint-disable-next-line */}
                <a>Testimonials</a>
              </Link>
            </ListItem>
          </LinksList>
        </SectionContainer>
        <SectionContainer>
          <LinksList>
            <HeaderTitle>More Links</HeaderTitle>
            <ListItem>
              <HorizontalContainer>
                <PurpleIcon>
                  <FontAwesomeIcon icon={faUserGroup} />
                </PurpleIcon>
                <a
                  href="https://www.linkedin.com/in/diegochuman/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SmallText>LinkedIn</SmallText>
                </a>
              </HorizontalContainer>
            </ListItem>
            <ListItem>
              <HorizontalContainer>
                <PurpleIcon>
                  <FontAwesomeIcon icon={faCodeBranch} />
                </PurpleIcon>
                <a
                  href="https://github.com/dcvdiego"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SmallText>GitHub</SmallText>
                </a>
              </HorizontalContainer>
            </ListItem>
          </LinksList>
        </SectionContainer>
        <SectionContainer>
          <HeaderTitle>Text me!</HeaderTitle>
          <HorizontalContainer>
            <PurpleIcon>
              <FontAwesomeIcon icon={faPhoneAlt} />
            </PurpleIcon>
            <SmallText>+4407832646484</SmallText>
          </HorizontalContainer>
        </SectionContainer>
        <SectionContainer>
          <HeaderTitle>Email me!</HeaderTitle>
          <HorizontalContainer>
            <PurpleIcon>
              <FontAwesomeIcon icon={faEnvelope} />
            </PurpleIcon>
            <SmallText>diegochuman@gmail.com</SmallText>
          </HorizontalContainer>
        </SectionContainer>
      </InnerContainer>
      <BottomContainer>
        <CopyrightText>
          Copyright &copy; {new Date().getFullYear()} Diego Chuman. All rights
          reserved.
        </CopyrightText>
      </BottomContainer>
    </FooterContainer>
  );
};
export default Footer;
