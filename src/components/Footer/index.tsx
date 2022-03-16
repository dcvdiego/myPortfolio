import React from 'react';
import {
  faCodeBranch,
  faEnvelope,
  faPhoneAlt,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  AboutContainer,
  AboutText,
  BottomContainer,
  ColoredIcon,
  CopyrightText,
  FooterContainer,
  HeaderTitle,
  HorizontalContainer,
  HorizontalTag,
  InnerContainer,
  LinksList,
  ListItem,
  SectionContainer,
  SmallText,
} from './footer.styles';

// import { Logo } from '../logo';

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
              <Link to="/">
                <a>Home</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/certifications">
                <a>Certifications</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/projects">
                <a>Projects</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/experiences">
                <a>Experiences</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/testimonials">
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
                <HorizontalTag
                  href="https://www.linkedin.com/in/diegochuman/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ColoredIcon color="blue">
                    <FontAwesomeIcon icon={faUserGroup} />
                  </ColoredIcon>
                  <SmallText>LinkedIn</SmallText>
                </HorizontalTag>
              </HorizontalContainer>
            </ListItem>
            <ListItem>
              <HorizontalContainer>
                <HorizontalTag
                  href="https://github.com/dcvdiego"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ColoredIcon color="orange">
                    <FontAwesomeIcon icon={faCodeBranch} />
                  </ColoredIcon>
                  <SmallText>GitHub</SmallText>
                </HorizontalTag>
              </HorizontalContainer>
            </ListItem>
          </LinksList>
        </SectionContainer>
        <SectionContainer>
          <HeaderTitle>Find me on WhatsApp!</HeaderTitle>
          <HorizontalContainer>
            <ColoredIcon color="green">
              <FontAwesomeIcon icon={faPhoneAlt} />
            </ColoredIcon>
            <SmallText>+4407832646484</SmallText>
          </HorizontalContainer>
        </SectionContainer>
        <SectionContainer>
          <HeaderTitle>Email me!</HeaderTitle>
          <HorizontalContainer>
            <ColoredIcon color="red">
              <FontAwesomeIcon icon={faEnvelope} />
            </ColoredIcon>
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
