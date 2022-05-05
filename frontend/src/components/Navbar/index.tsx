import React from 'react';
import { Link } from 'react-router-dom';
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
const Logo = () => {
  const DContainer = styled.span`
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 15px;
      background: #000;
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
    background: linear-gradient(to bottom, #000, #000 60%, #fff 60%, #fff 100%);
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

const Navbar = () => {
  const snap = useSnapshot(browserState);
  if (window.localStorage.getItem('readerMode')) browserState.readerMode = true;
  if (window.sessionStorage.getItem('bannerConsent'))
    browserState.bannerConsent = true;
  const handleReaderMode = () => {
    browserState.readerMode = true;
    window.localStorage.setItem('readerMode', 'true');
  };
  const handleBannerConsent = () => {
    browserState.bannerConsent = true;
    window.sessionStorage.setItem('bannerConsent', 'true');
  };

  return (
    <>
      <NavbarContainer>
        <Link to="/">
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Link>
        <NavItems />
      </NavbarContainer>
      {snap.readerMode || snap.bannerConsent ? null : (
        <ReaderModeBanner>
          <BannerText>
            Having trouble loading the page? Switch to&nbsp;
            <ReaderModeButton onClick={handleReaderMode}>
              Reader Mode
            </ReaderModeButton>
          </BannerText>

          <CloseButton onClick={handleBannerConsent}>{'\u2715'}</CloseButton>
        </ReaderModeBanner>
      )}
    </>
  );
};

export default Navbar;
