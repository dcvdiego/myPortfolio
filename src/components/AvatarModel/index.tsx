import { Bounds, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import MyModel from './model.jsx';

type ActionName = 'Dance' | 'Idle' | 'Run' | 'Walk' | 'Wave';
interface IAvatarModelProps {
  action: ActionName;
}
const AvatarModel = ({ action }: IAvatarModelProps) => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 12.5, 10], fov: 90 }}>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.5} />
      {/* {lights.map(([x, y, z, intensity]) => (
        <pointLight intensity={intensity} position={[x, y, z]} color="#fff" />
      ))} */}
      <OrbitControls makeDefault />
      <Suspense fallback={null}>
        <Bounds fit clip margin={0.9}>
          <MyModel action={action} scale={[10.5, 10.5, 10.5]} />
        </Bounds>
      </Suspense>
    </Canvas>
  );
};
// const lights = [
//   [0, 1, 25, 0.2],
//   [0, 2, -20, 0.4],
//   [5, 0, 21, 0.4],
//   [-5, 0, -21, 0.4],
//   [3, 0, 25, 0.7],
// ];
export default AvatarModel;
