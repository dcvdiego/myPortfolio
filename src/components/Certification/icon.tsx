import React from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

interface IIConProps {
  isSelected: boolean;
  isHover: boolean;
}

const ModelComponent = dynamic(() => import('./model'), {
  ssr: false
});

export default function Icon({ isSelected, isHover }: IIConProps) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.5], fov: 45 }}>
      {lights.map(([x, y, z, intensity], i) => (
        <pointLight
          key={i}
          intensity={intensity}
          position={[x / 8, y / 8, z / 8]}
          color="#fff"
        />
      ))}
      <group dispose={null}>
        <ModelComponent isSelected={isSelected} isHover={isHover} />
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
