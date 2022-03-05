import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
const routes = [
  {
    path: '/',
    exact: true,
    main: () => <h2>Home</h2>,
  },
  {
    path: '/certifications',
    main: () => <h2>Bubblegum</h2>,
  },
  {
    path: '/shoelaces',
    main: () => <h2>Shoelaces</h2>,
  },
];
const NavItems = () => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  if (isMobile)
    return (
      <Menu right styles={menuStyles}>
        <ListContainer>
          <NavItem menu>
            <Link to="/">
              {/* eslint-disable-next-line */}
              <a>Home</a>
            </Link>
          </NavItem>
          <NavItem menu>
            <Link to="/certifications">
              {/* eslint-disable-next-line */}
              <a>Certifications</a>
            </Link>
          </NavItem>
          <NavItem menu>
            <Link to="/experiences">
              {/* eslint-disable-next-line */}
              <a>Experiences</a>
            </Link>
          </NavItem>
          <NavItem menu>
            <Link to="/projects">
              {/* eslint-disable-next-line */}
              <a>Projects</a>
            </Link>
          </NavItem>
          <NavItem menu>
            <Link to="/testimonials">
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
        <Link to="/">
          {/* eslint-disable-next-line */}
          <a>Home</a>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/certifications">
          {/* eslint-disable-next-line */}
          <a>Certifications</a>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/experiences">
          {/* eslint-disable-next-line */}
          <a>Experiences</a>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/projects">
          {/* eslint-disable-next-line */}
          <a>Projects</a>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/testimonials">
          {/* eslint-disable-next-line */}
          <a>Testimonials</a>
        </Link>
      </NavItem>
    </ListContainer>
  );
};

export default NavItems;
