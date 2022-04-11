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
              <Link to="/">Home</Link>
            </ListItem>
            <ListItem>
              <Link to="/about">About Me</Link>
            </ListItem>
            <ListItem>
              <Link to="/projects">Projects</Link>
            </ListItem>
            <ListItem>
              <Link to="/experiences">ExperienceApp</Link>
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
          {snap.readerMode && snap.canRun ? (
            <Button onClick={() => handleReaderMode(false)}>
              Experience this website fully
            </Button>
          ) : snap.canRun ? (
            <Button onClick={() => handleReaderMode(true)}>ReaderMode</Button>
          ) : null}
        </SectionContainer>
      </InnerContainer>
      <BottomContainer>
        <OSText>
          Open Source project made by Diego Chuman and everyone in creds. Check
          out the GitHub repo!
        </OSText>
      </BottomContainer>
    </FooterContainer>
  );
};
export default Footer;
