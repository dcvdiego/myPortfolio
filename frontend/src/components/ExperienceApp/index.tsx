import React, { Suspense, useState } from 'react';
import { Button } from '../../styles/global.styles';
import { PerspectiveCamera, Loader, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Icon from './models/icon';
import PlayerMovement from './playerMovement';
import Overlay from './overlay';
import { appState } from '../../utils/store';
import { useSnapshot } from 'valtio';
import Cloud from '../WordCloud/model';
import BaseSection from './models/corridor/baseSection';
import BalletMannequin from './models/balletMannequin';
import Dress from './models/dress';
import Screen from './models/screen';
import CertificationsPage from '../../pages/certifications';
import CERTIFICATIONS_QUERY from '../../graphql/Certification/certifications';
import { ApolloProvider } from '@apollo/client';
import client from '../../utils/apolloClient';
import { UIContainer } from './eApp.styles';
import ABOUT_QUERY from '../../graphql/About/about';
import AboutPage from '../../pages/about';
import LFWLogo from '../../assets/london-fashion-week-logo.png';
import Placeholder from '../../assets/placeholder.png';
import tw, { styled } from 'twin.macro';

export default function App() {
  const [autoWalk, setAutoWalk] = useState(false);
  const [screenNumber, setScreenNumber] = useState(0);
  const snap = useSnapshot(appState);
  const handleBack = () => {
    appState.verse = null;
    appState.appStarted = false;
  };
  const linkArray = [
    'hard work',
    'enthusiasm',
    'dedication',
    'commitment',
    'pragmatic',
    'leadership',
  ];
  const AppContainer = styled.div`
    ${tw`
  h-screen
  w-full
  overflow-x-hidden
  `}
  `;
  return (
    <>
      <AppContainer>
        <Canvas
          shadows
          camera={{ fov: 75, near: 0.1, far: 1000, position: [-11, 1, -62] }}
        >
          <ApolloProvider client={client}>
            <PerspectiveCamera makeDefault />

            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
            />
            <Suspense fallback={null}>
              {/* every -18 units you can add a new corridor */}
              {snap.verse && (
                <PlayerMovement
                  AutoWalk={autoWalk}
                  location="App"
                  screen={screenNumber ? true : false}
                />
              )}
              <BaseSection scale={4} position={[-11, 4.5, -62]} />
              {snap.verse === 'IBM' && (
                <>
                  {/* CERTIFICATIONS SECTION */}
                  <Icon />
                  <Screen
                    scale={0.25}
                    position={[-2, 0, -70]}
                    rotation={[0, -Math.PI / 2, 0]}
                    cover={Placeholder}
                    query={CERTIFICATIONS_QUERY}
                    Component={<CertificationsPage screen />}
                    screen={screenNumber === 1 ? screenNumber : 0}
                    onClick={() => setScreenNumber(1)}
                  />
                  {/* LONDON FASHION WEEK SECTION */}
                  <BaseSection scale={4} position={[-11, 4.5, -80]} />
                  <BalletMannequin
                    scale={4}
                    position={[-19, 1, -94]}
                    rotation={[0, 20, 0]}
                  />
                  <Dress scale={4} position={[-11, -1, -90]} />
                  <Screen
                    scale={0.25}
                    position={[-2, 0, -90]}
                    rotation={[0, -Math.PI / 2, 0]}
                    cover={LFWLogo}
                    query={ABOUT_QUERY}
                    Component={<AboutPage screen />}
                    screen={screenNumber === 2 ? screenNumber : 0}
                    onClick={() => setScreenNumber(2)}
                  />
                  <BaseSection scale={4} position={[-11, 4.5, -98]} door />
                </>
              )}
              {snap.verse === 'PP' && (
                <Cloud
                  dist={linkArray.length}
                  radius={20}
                  data={linkArray}
                  origin="app"
                />
              )}
            </Suspense>
          </ApolloProvider>
        </Canvas>
      </AppContainer>
      <Overlay />
      <Loader />
      <UIContainer>
        {autoWalk && screenNumber === 0 ? (
          <Button
            style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
            onClick={() => setAutoWalk(false)}
          >
            Stop
          </Button>
        ) : (
          screenNumber === 0 && (
            <Button
              style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
              onClick={() => setAutoWalk(true)}
            >
              Auto-Walk
            </Button>
          )
        )}
        {snap.verse && screenNumber === 0 && (
          <Button
            style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
            onClick={handleBack}
          >
            Back to menu
          </Button>
        )}
        {screenNumber > 0 && (
          <Button
            style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
            onClick={() => setScreenNumber(0)}
          >
            Go Back
          </Button>
        )}
      </UIContainer>
    </>
  );
}

// thanks to Prakhar Varshney for camera, and player movement core
