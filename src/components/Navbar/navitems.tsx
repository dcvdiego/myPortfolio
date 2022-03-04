import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';
import menuStyles from './menuStyles';

const ListContainer = styled.ul`
  ${tw`
    flex
    list-none
`};
`;
const NavItem = styled.li<{ menu?: any }>`
  ${tw`
    text-sm
    md:text-base
    text-black
    font-medium
    mr-1
    md:mr-5
    cursor-pointer
    transition
    duration-300
    ease-in-out
    hover:text-gray-700
    `};
  ${({ menu }) =>
    menu &&
    css`
      ${tw`
    text-white
    text-xl
    mb-3
    focus:text-white
    `};
    `};
`;

const NavItems = () => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  if (isMobile)
    return (
      <Menu right styles={menuStyles}>
        <ListContainer>
          <NavItem menu>
            <Link href="/">
              {/* eslint-disable-next-line */}
              <a>Home</a>
            </Link>
          </NavItem>
          <NavItem menu>
            <Link href="/certifications">
              {/* eslint-disable-next-line */}
              <a>Certifications</a>
            </Link>
          </NavItem>
          <NavItem menu>
            <Link href="/experiences">
              {/* eslint-disable-next-line */}
              <a>Experiences</a>
            </Link>
          </NavItem>
          <NavItem menu>
            <Link href="/projects">
              {/* eslint-disable-next-line */}
              <a>Projects</a>
            </Link>
          </NavItem>
          <NavItem menu>
            <Link href="/testimonials">
              {/* eslint-disable-next-line */}
              <a>Testimonials</a>
            </Link>
          </NavItem>
        </ListContainer>
      </Menu>
    );

  return (
    <ListContainer>
      <NavItem>
        <Link href="/">
          {/* eslint-disable-next-line */}
          <a>Home</a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/certifications">
          {/* eslint-disable-next-line */}
          <a>Certifications</a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/experiences">
          {/* eslint-disable-next-line */}
          <a>Experiences</a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/projects">
          {/* eslint-disable-next-line */}
          <a>Projects</a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/testimonials">
          {/* eslint-disable-next-line */}
          <a>Testimonials</a>
        </Link>
      </NavItem>
    </ListContainer>
  );
};

export default NavItems;
