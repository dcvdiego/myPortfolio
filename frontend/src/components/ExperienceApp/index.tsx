import { Button } from '../../styles/global.styles';
import { Physics } from '@react-three/cannon';
import { Sky, PerspectiveCamera, Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState } from 'react';
import Ground from './ground';
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

export default function App() {
  const [autoWalk, setAutoWalk] = useState(false);
  const [screenToggle, setScreenToggle] = useState(false);
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

  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [-11, 1, -62] }}
      >
        <ApolloProvider client={client}>
          <PerspectiveCamera makeDefault />

          <Sky
            distance={4500}
            sunPosition={[0, 1, 1]}
            inclination={0}
            azimuth={0.5}
          />
          <Physics>
            <Suspense fallback={null}>
              {/* every -18 units you can add a new corridor */}
              <BaseSection scale={4} position={[-11, 4.5, -62]} />
              <Ground rotation={[-Math.PI / 2, 0, 0]} />
              {snap.verse && (
                <PlayerMovement
                  AutoWalk={autoWalk}
                  location="App"
                  screen={screenToggle ? true : false}
                />
              )}
              {snap.verse === 'IBM' && (
                <>
                  <BaseSection scale={4} position={[-11, 4.5, -80]} />
                  <BalletMannequin
                    scale={4}
                    position={[-19, 1, -94]}
                    rotation={[0, 20, 0]}
                  />
                  <Dress scale={4} position={[-11, -1, -90]} />
                  <Icon />
                  <Screen
                    scale={0.25}
                    position={[-2, 0, -90]}
                    rotation={[0, -Math.PI / 2, 0]}
                    query={CERTIFICATIONS_QUERY}
                    Component={<CertificationsPage screen />}
                    screen={screenToggle}
                    setScreen={setScreenToggle}
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
          </Physics>
        </ApolloProvider>
      </Canvas>
      <Overlay />
      <Loader />
      <UIContainer>
        {autoWalk && !screenToggle ? (
          <Button
            style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
            onClick={() => setAutoWalk(false)}
          >
            Stop
          </Button>
        ) : (
          !screenToggle && (
            <Button
              style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
              onClick={() => setAutoWalk(true)}
            >
              AutoWalk
            </Button>
          )
        )}
        {snap.verse && !screenToggle && (
          <Button
            style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
            onClick={handleBack}
          >
            Back to menu
          </Button>
        )}
        {screenToggle && (
          <Button
            style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
            onClick={() => setScreenToggle(false)}
          >
            Go Back
          </Button>
        )}
      </UIContainer>
    </>
  );
}

// thanks to Prakhar Varshney for camera, and player movement core
