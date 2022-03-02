import { Bounds, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const MyModel = dynamic(() => import('./model'), {
  ssr: false
});
interface IMeModelProps {
  action: string;
}
const MeModel = ({ action }: IMeModelProps) => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 12.5, 10], fov: 90 }}>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.5} />
      {/* {lights.map(([x, y, z, intensity]) => (
            <pointLight intensity={intensity} position={[x, y, z]} color="#fff" />
        ))} */}
      {/* <OrbitControls makeDefault /> */}
      <Suspense fallback={null}>
        <Bounds fit clip margin={0.9}>
          <MyModel action={action} scale={[10.5, 10.5, 10.5]} />
        </Bounds>
      </Suspense>
    </Canvas>
  );
};
// const lights = [
//   [0, 1, 25, 0.4],
//   [0, 2, -20, 0.6],
//   [5, 0, 21, 0.6],
//   [-5, 0, -21, 0.6],
//   [3, 0, 25, 0.9]
// ];
export default MeModel;
