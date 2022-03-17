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
export default function App() {
  const [autoWalk, setAutoWalk] = useState(false);
  // state when you are in a verse
  // state for which verse you are in
  const snap = useSnapshot(appState);
  const handleBack = () => {
    appState.verse = null;
    appState.gameStarted = false;
  };
  return (
    <>
      <Canvas
        // mode="concurrent"
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [-11, 1, -62] }}
      >
        <PerspectiveCamera makeDefault />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[0, 1, 1]} />

        <Sky
          distance={4500}
          sunPosition={[0, 1, 1]}
          inclination={0}
          azimuth={0.5}
        />
        <Physics>
          <Suspense fallback={null}>
            <Ground rotation={[-Math.PI / 2, 0, 0]} />
            {/* maybe also add UI? for back button and other stuff */}
            {snap.verse && <PlayerMovement AutoWalk={autoWalk} />}
            {/* not necessarily just Icon, can be a lot of other things too, maybe a jsx component with all the meshes */}
            {snap.verse === 'IBM' && <Icon />}
          </Suspense>
        </Physics>
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
