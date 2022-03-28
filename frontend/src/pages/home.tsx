import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import AvatarCanvas from '../components/AvatarModel';
import { Marginer } from '../components/Marginer';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { Button, Container, SubHeading, Title } from '../styles/global.styles';

import quote from '../assets/data/quote.json';
import state from '../utils/store';
import { isValidHttpUrl } from '../utils/generalHelpers';
import { ActionName } from '../components/AvatarModel/avatarModel.types';
import AnimatedCharacters from '../components/BubbleText';
import Picker from '../components/ColorPicker';
import TutorialOverlay from '../components/TutorialOverlay';

const Bubble = styled(motion.div)`
  background-color: #26272b;
  color: #9fa2a7;
  font-size: 0.8em;
  line-height: 1.75;
  padding: 15px 25px;
  margin-bottom: 75px;
  cursor: default;
  border-right: 5px solid;
  border-color: #b388dd;
  &:after {
    content: '';
    margin-top: -30px;
    padding-top: 0px;
    position: relative;
    bottom: -45px;
    left: 10%;
    border-width: 30px 30px 0 0;
    border-style: solid;
    border-color: #26272b transparent;
    display: block;
    width: 0;
  }
`;
const ModelContainer = styled(motion.div)`
  height: 48rem;
  width: 20%;
  position: absolute;
  left: 10rem;
`;

// for reader mode, it will be activated whether canRun is false and or readerMode is true
// torn between making it a single page app with all of the info pretty CV style or use a navbar and have a reader mode for each page?
function Home() {
  const [action, setAction] = useState<ActionName>('Idle');
  const [input, setInput] = useState('');
  const [tutorial, setTutorial] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState<boolean>(true);
  const [quoteString, setQuoteString] = useState<string>(
    quote.quoteArray[index % quote.quoteArray.length]
  );
  useEffect(() => {
    if (!isValidHttpUrl(input) || !input.endsWith('.glb')) {
      setInput('invalid');
      return;
    }
    state.avatarURL = input;
  }, [input]);

  useEffect(() => {
    const tick = () => setIndex((i) => i + 1);
    const id = setInterval(tick, 7000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    setTransition(!transition);
    setTimeout(() => {
      setQuoteString(quote.quoteArray[index % quote.quoteArray.length]);
    }, 600);
    setTimeout(() => {
      setTransition(true);
    }, 600);
  }, [index]);
  return (
    <Layout title="Welcome">
      <Container>
        <ModelContainer
          initial={false}
          animate={[action === 'Wave' ? 'wave' : 'idle']}
          onHoverStart={() => setAction('Wave')}
          onHoverEnd={() => setAction('Idle')}
        >
          <AvatarCanvas action={action} location="AvatarConfigurator" />
          <Picker />
          <Marginer direction="vertical" margin="6em" />
          <Button type="button" onClick={() => setAction('Dance')}>
            Dance
          </Button>
        </ModelContainer>
        <Title>
          <Bubble
            animate={transition ? 'visible' : 'hidden'}
            variants={bubbleVariants}
          >
            <AnimatedCharacters text={quoteString} />
          </Bubble>
        </Title>
        <SubHeading>
          If you want to use your own
          <p> </p>
          <button onClick={() => setTutorial(true)}> avatar</button>:
        </SubHeading>
        {input === 'invalid' && (
          <SubHeading>Please upload a valid url</SubHeading>
        )}
        <input
          style={{ color: 'black' }}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
        />
        {tutorial ? <TutorialOverlay setTutorial={setTutorial} /> : null}
      </Container>
    </Layout>
  );
}

const bubbleVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};
export default Home;
