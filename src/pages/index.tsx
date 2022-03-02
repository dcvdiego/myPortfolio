import React, { useState } from 'react';
import { NextPage } from 'next';

import Layout from '@/components/Layout';
import MeModel from '@/components/MeModel';
import { Container, Link, Title } from '../styles/global.styles';
import { Marginer } from '@/components/Marginer';

const LandingPage: NextPage = () => {
  const [action, setAction] = useState('Idle');
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
          <Marginer direction="vertical" margin="8em" />
          <div style={{ height: '20rem' }}>
            <MeModel action={action} />
          </div>
          <button type="button" onClick={() => setAction('Wave')}>
            Wave
          </button>
          <button type="button" onClick={() => setAction('Dance')}>
            Dance
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default LandingPage;
