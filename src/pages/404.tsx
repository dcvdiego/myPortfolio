import { Container, SubHeading, Title } from '@/styles/global.styles';
import React from 'react';

const Custom404 = () => {
  return (
    <Container>
      <Title>404 - Page Not Found</Title>
      <SubHeading>
        Seems like you were wondering off! Please only navigate this site
        through the navbar and its contents :D
      </SubHeading>
    </Container>
  );
};
export default Custom404;
