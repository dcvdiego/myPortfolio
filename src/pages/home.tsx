import React, { useState } from 'react';

import Layout from '../components/Layout';
import AvatarModel from '../components/AvatarModel';
import { Marginer } from '../components/Marginer';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { Button, Container, Title } from '../styles/global.styles';
import { HexColorPicker } from 'react-colorful';
import { useSnapshot } from 'valtio';
import quote from '../assets/data/quote.json';
import state from '../utils/store';
const Bubble = styled(motion.span)`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
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

const ColorPicker = styled(HexColorPicker)`
  .react-colorful {
    padding: 16px;
    border-radius: 12px;
    background: #33333a;
    box-shadow: 0 6px 12px #999;
  }
`;
function Picker() {
  const snap = useSnapshot(state);
  return (
    <div style={{ display: snap.current ? 'flex' : 'none' }}>
      <ColorPicker
        className="picker"
        color={snap.items[String(snap.current)]}
        onChange={(color) => (state.items[String(snap.current)] = color)}
      />
      <h1 style={{ color: 'white' }}>{snap.current}</h1>
    </div>
  );
}

function Home() {
  type ActionName = 'Dance' | 'Idle' | 'Run' | 'Walk' | 'Wave';
  const [action, setAction] = useState<ActionName>('Idle');
  // const mouse = useRef({ x: 0, y: 0 });

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
            <Bubble variants={bubbleVariants}>
              {
                quote.quoteArray[
                  Math.floor(Math.random() * quote.quoteArray.length)
                ]
              }
            </Bubble>
          </Title>

          <AvatarModel action={action} />
          <Picker />
        </ModelContainer>

        <Marginer direction="vertical" margin="6em" />
        <Button type="button" onClick={() => setAction('Dance')}>
          Dance
        </Button>
        <Button type="button" onClick={() => (state.avatarName = 'TJModel')}>
          Upload Avatar
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
