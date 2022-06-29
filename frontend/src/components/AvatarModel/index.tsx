import { Bounds, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import AvatarModel from './model.jsx';
import { ActionName, LocationName } from './avatarModel.types.js';
import { Loader } from '../../styles/global.styles';

interface IAvatarCanvasProps {
  action: ActionName;
  location: LocationName;
}
const AvatarCanvas = ({ ...props }: IAvatarCanvasProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 5, 10], fov: 90 }}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.5} />
        {/* {lights.map(([x, y, z, intensity]) => (
        <pointLight intensity={intensity} position={[x, y, z]} color="#fff" />
      ))} */}
        <OrbitControls makeDefault />
        <Bounds fit clip margin={0.5}>
          <AvatarModel {...props} scale={5} />
        </Bounds>
      </Canvas>
    </Suspense>
  );
};
// const lights = [
//   [0, 1, 25, 0.2],
//   [0, 2, -20, 0.4],
//   [5, 0, 21, 0.4],
//   [-5, 0, -21, 0.4],
//   [3, 0, 25, 0.7],
// ];
export default AvatarCanvas;
