import React, { useState } from 'react';

import Layout from '../components/Layout';
import MeModel from '../components/MeModel';
import { Marginer } from '../components/Marginer';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { Button, Container, Title } from '../styles/global.styles';

const Bubble = styled(motion.span)`
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;

  &:before {
    position: absolute;
    z-index: -1;
    content: '';
    left: calc(50% - 10px);
    bottom: 0;
    border-style: solid;
    border-width: 10px 10px 0 10px;
    border-color: #e1e1e1 transparent transparent transparent;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
    display: none;
  }
  &:hover,
  &:focus,
  &:active {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
    display: inline-block;
  }
  &:hover:before,
  &:focus:before,
  &:active:before {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
    display: inline-block;
  }
`;
const ModelContainer = styled(motion.div)`
  height: 18rem;
`;
function Home() {
  const [action, setAction] = useState('Idle');
  return (
    <Layout title="Welcome">
      <Container>
        <ModelContainer
          initial={false}
          animate={[action === 'Wave' ? 'wave' : 'idle']}
          onHoverStart={() => setAction('Wave')}
          onHoverEnd={() => setAction('Idle')}
        >
          <Title>
            <Bubble variants={bubbleVariants}>Hello , my name is Diego</Bubble>
          </Title>

          <MeModel action={action} />
        </ModelContainer>
        <Marginer direction="vertical" margin="6em" />
        <Button type="button" onClick={() => setAction('Dance')}>
          Dance
        </Button>
      </Container>
    </Layout>
  );
}

const bubbleVariants: Variants = {
  idle: { opacity: 0 },
  wave: { opacity: 1 },
};
export default Home;
