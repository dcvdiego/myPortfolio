import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useSnapshot } from 'valtio';
import { browserState } from '../../utils/store';
// import { Logo } from '../logo';
import NavItems from './navitems';

const NavbarContainer = styled.div`
  min-height: 68px;
  ${tw`
        w-full
        max-w-screen-2xl
        flex
        flex-row
        items-center
        lg:pl-12
        lg:pr-12
        justify-between
    `}
`;

const LogoContainer = styled.div``;

const ReaderModeBanner = styled.div`
  ${tw`
  flex
  bg-red-500
  text-white
  `}
  &::before, p {
    flex-basis: 100%;
  }
`;
const ReaderModeButton = styled.button`
  ${tw`
    underline
    `}
`;
const BannerText = styled.p`
  ${tw`
  text-center
  `}
`;
const CloseButton = styled.button`
  ${tw`
  text-right
  no-underline
  mr-10
  `}
`;

const Navbar = () => {
  const snap = useSnapshot(browserState);
  return (
    <>
      <NavbarContainer>
        <LogoContainer>{/* <Logo /> */}</LogoContainer>
        <NavItems />
      </NavbarContainer>
      {snap.readerMode || snap.bannerConsent ? null : (
        <ReaderModeBanner>
          <BannerText>
            Having trouble loading the page? Switch to&nbsp;
            <ReaderModeButton onClick={() => (browserState.readerMode = true)}>
              Reader Mode
            </ReaderModeButton>
          </BannerText>

          <CloseButton onClick={() => (browserState.bannerConsent = true)}>
            {'\u2715'}
          </CloseButton>
        </ReaderModeBanner>
      )}
    </>
  );
};

export default Navbar;
