import React from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { MotionCanvas } from 'framer-motion-3d';

interface IIConProps {
  isSelected: boolean;
  isHover: boolean;
  url: string;
}

const ModelComponent = dynamic(() => import('./model'), {
  ssr: false
});

export default function Icon({ isHover, isSelected, url }: IIConProps) {
  return (
    <Canvas
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
    >
      {lights.map(([x, y, z, intensity]) => (
        <pointLight
          intensity={intensity}
          position={[x / 8, y / 8, z / 2]}
          color="#fff"
        />
      ))}
      <group dispose={null}>
        <ModelComponent isHover={isHover} isSelected={isSelected} url={url} />
      </group>
    </Canvas>
  );
}

const lights = [
  [0, 1, 5, 0.1],
  [0, 2, 0, 0.3],
  [5, 0, 1, 0.2],
  [-5, 0, 1, 0.2],
  [3, 0, 5, 0.6]
];
