import React from 'react';
import { NextPage } from 'next';

import Layout from '@/components/Layout';
import { Container, Link, Title } from '../styles/global.styles';

const LandingPage: NextPage = () => {
  return (
    <Layout title="Welcome">
      <Container>
        <Title>Hello, my name is Diego</Title>
        <div tw="text-xl space-y-4 md:space-x-4">
          <span>Plan for page</span>
          {/* keeping this as an example of props in tw/ts until I do one myself */}
          <Link color="red" href="https://reactjs.org/">
            React
          </Link>
        </div>
      </Container>
    </Layout>
  );
};

export default LandingPage;
