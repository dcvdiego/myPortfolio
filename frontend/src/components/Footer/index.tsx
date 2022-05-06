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
  OSText,
  FooterContainer,
  HeaderTitle,
  HorizontalContainer,
  HorizontalExternalTag,
  InnerContainer,
  LinksList,
  ListItem,
  SectionContainer,
  SmallText,
} from './footer.styles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '../../styles/global.styles';
import { useSnapshot } from 'valtio';
import { browserState } from '../../utils/store';
import { Marginer } from '../Marginer';
import { styled } from 'twin.macro';

// import { Logo } from '../logo';

const Footer = () => {
  const snap = useSnapshot(browserState);
  const handleReaderMode = (set: boolean) => {
    if (set) {
      window.localStorage.setItem('readerMode', 'true');
      browserState.readerMode = set;
    }
    if (!set) {
      window.localStorage.removeItem('readerMode');
      browserState.readerMode = set;
    }
  };
  // I know, I am lazy
  const InvertLogo = () => {
    const DContainer = styled.span`
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 15px;
        background: #fff;
        bottom: 5px;
        transition: all 0.2s ease-out;
      }
      &:hover:before {
        transform: translateY(18px);
      }
    `;
    const DContent = styled.p`
      cursor: pointer;
      position: relative;
      display: inline-block;
      font-size: 3rem;
      background: linear-gradient(
        to bottom,
        #fff,
        #fff 60%,
        #000 60%,
        #000 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-repeat: no-repeat;
      transition: background 0.2s ease-out;
      white-space: nowrap;
      &:hover {
        background-position: 0 11px;
      }
    `;
    return (
      <DContainer>
        <DContent>DC</DContent>
      </DContainer>
    );
  };
  return (
    <FooterContainer>
      <InnerContainer>
        <AboutContainer>
          <Link to="/">
            <InvertLogo />
          </Link>
          <AboutText>
            This is my portfolio websites where I will showcase my journey in
            development
          </AboutText>
        </AboutContainer>
        <SectionContainer>
          <LinksList>
            <HeaderTitle>Get Started</HeaderTitle>
            <ListItem>
              <Link to="/experiences">ExperienceApp</Link>
            </ListItem>
            <ListItem>
              <Link to="/about">About Me</Link>
            </ListItem>
            <ListItem>
              <Link to="/testimonials">Testimonials</Link>
            </ListItem>
            <ListItem>
              <Link to="/projects">Projects</Link>
            </ListItem>
            <ListItem>
              <Link to="/creds">Creds</Link>
            </ListItem>
          </LinksList>
        </SectionContainer>
        <SectionContainer>
          <LinksList>
            <HeaderTitle>More Links</HeaderTitle>
            <ListItem>
              <HorizontalContainer>
                <HorizontalExternalTag
                  href="https://www.linkedin.com/in/diegochuman/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ColoredIcon color="blue">
                    <FontAwesomeIcon icon={faUserGroup as IconProp} />
                  </ColoredIcon>
                  <SmallText>LinkedIn</SmallText>
                </HorizontalExternalTag>
              </HorizontalContainer>
            </ListItem>
            <ListItem>
              <HorizontalContainer>
                <HorizontalExternalTag
                  href="https://github.com/dcvdiego"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ColoredIcon color="orange">
                    <FontAwesomeIcon icon={faCodeBranch as IconProp} />
                  </ColoredIcon>
                  <SmallText>GitHub</SmallText>
                </HorizontalExternalTag>
              </HorizontalContainer>
            </ListItem>
          </LinksList>
        </SectionContainer>
        <SectionContainer>
          <HeaderTitle>Find me on WhatsApp!</HeaderTitle>
          <HorizontalContainer>
            <ColoredIcon color="green">
              <FontAwesomeIcon icon={faPhoneAlt as IconProp} />
            </ColoredIcon>
            <SmallText>+4407832646484</SmallText>
          </HorizontalContainer>
        </SectionContainer>
        <SectionContainer>
          <HeaderTitle>Email me!</HeaderTitle>
          <HorizontalContainer>
            <ColoredIcon color="red">
              <FontAwesomeIcon icon={faEnvelope as IconProp} />
            </ColoredIcon>
            <SmallText>diegochuman@gmail.com</SmallText>
          </HorizontalContainer>
          <Marginer direction="vertical" margin="1em" />
          {snap.readerMode && snap.canRun ? (
            <Button onClick={() => handleReaderMode(false)}>NormalMode</Button>
          ) : snap.canRun ? (
            <Button onClick={() => handleReaderMode(true)}>ReaderMode</Button>
          ) : null}
        </SectionContainer>
      </InnerContainer>
      <BottomContainer>
        <OSText>
          Open Source project made by Diego Chuman and everyone in{' '}
          <Link to="/creds">Creds</Link>. Check out the GitHub repo!
        </OSText>
      </BottomContainer>
    </FooterContainer>
  );
};
export default Footer;
