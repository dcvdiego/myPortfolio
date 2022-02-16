import React from 'react';
import { NextPage } from 'next';
import tw, { styled, TwStyle } from 'twin.macro';

import Layout from '@/components/Layout';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Welcome">
      <Container>
        <Title>Hello, my name is Diego</Title>
        <div tw="text-xl space-y-4 md:space-x-4">
          <span>Learn</span>
          {/* keeping this as an example of props in tw/ts */}
          <Link color="red" href="https://reactjs.org/">
            React
          </Link>
        </div>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  ${tw`absolute inset-0 w-full h-screen flex flex-col justify-center items-center`}
`;

const Title = styled.h1`
  ${tw`text-3xl sm:text-4xl font-semibold tracking-wide mb-12`}
`;

const linkStyles: Record<string, TwStyle> = {
  red: tw`text-red-500 hover:text-red-700`
};

const Link = styled.a(({ color }) => [
  tw`block md:inline font-semibold transition-colors duration-300`,
  color && linkStyles[color]
]);

export default IndexPage;
