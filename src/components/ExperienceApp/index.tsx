import { Physics } from '@react-three/cannon';
import { Sky, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import Ground from './ground';
import PlayerMovement from './playerMovement';

export default function App() {
  return (
    <Canvas
      mode="concurrent"
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
        azimuth={0.25}
      />
      <Physics>
        <Suspense fallback={null}>
          <Ground rotation={[-Math.PI / 2, 0, 0]} />
          <PlayerMovement />
        </Suspense>
      </Physics>
    </Canvas>
  );
}
