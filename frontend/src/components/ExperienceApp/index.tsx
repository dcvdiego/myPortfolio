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

export default function App() {
  const [autoWalk, setAutoWalk] = useState(false);
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
          {/* <ambientLight intensity={0.5} /> */}
          {/* <directionalLight intensity={0.5} position={[0, 1, 1]} /> */}

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
              {/* maybe also add UI? for back button and other stuff */}
              {snap.verse && (
                <PlayerMovement AutoWalk={autoWalk} location="App" />
              )}
              {/* not necessarily just Icon, can be a lot of other things too, maybe a jsx component with all the meshes */}
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
                    scale={0.75}
                    position={[-11, 0, -110]}
                    query={CERTIFICATIONS_QUERY}
                    Component={<CertificationsPage screen />}
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
      {autoWalk ? (
        <Button onClick={() => setAutoWalk(false)}>Stop</Button>
      ) : (
        <Button onClick={() => setAutoWalk(true)}>AutoWalk</Button>
      )}
      {snap.verse && <Button onClick={handleBack}>Back to menu</Button>}
    </>
  );
}

// thanks to Prakhar Varshney for camera, and player movement core
