import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { slide as Menu } from 'react-burger-menu';
import menuStyles from './menuStyles';
import { isMobile } from 'react-device-detect';

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
    text-2xl
    mb-3
    focus:text-white
    `};
    `};
`;

const NavItems = () => {
  // const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  if (isMobile)
    return (
      <Menu right styles={menuStyles}>
        <ListContainer>
          <NavItem menu>
            <Link to="/about">About Me</Link>
          </NavItem>
          <NavItem menu>
            <Link to="/certifications">Certifications</Link>
          </NavItem>
          <NavItem menu>
            <Link to="/experiences">Experiences</Link>
          </NavItem>
          <NavItem menu>
            <Link to="/projects">Projects</Link>
          </NavItem>
          <NavItem menu>
            <Link to="/testimonials">Testimonials</Link>
          </NavItem>
        </ListContainer>
      </Menu>
    );

  return (
    <ListContainer>
      <NavItem>
        <Link to="/about">About Me</Link>
      </NavItem>
      <NavItem>
        <Link to="/certifications">Certifications</Link>
      </NavItem>
      <NavItem>
        <Link to="/experiences">Experiences</Link>
      </NavItem>
      <NavItem>
        <Link to="/projects">Projects</Link>
      </NavItem>
      <NavItem>
        <Link to="/testimonials">Testimonials</Link>
      </NavItem>
    </ListContainer>
  );
};

export default NavItems;
