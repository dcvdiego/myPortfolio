import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Model from './model';
import { shapeName } from './certification.types';

interface IIConProps {
  isSelected: boolean;
  isHover: boolean;
  url: string;
  shape: shapeName;
}

export default function Icon({ isHover, isSelected, url, shape }: IIConProps) {
  const ocRef = useRef<OrbitControlsImpl>(null);
  useEffect(() => {
    if (!isHover && ocRef) ocRef.current?.reset();
  }, [isHover]);
  return (
    <Canvas
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
    >
      {/* {lights.map(([x, y, z, intensity]) => (
        <pointLight
          intensity={intensity}
          position={[x / 8, y / 8, z / 4]}
          color="#fff"
        />
      ))} */}
      <ambientLight />
      <Model
        isHover={isHover}
        isSelected={isSelected}
        url={url}
        shape={shape}
      />
      <OrbitControls ref={ocRef} autoRotate={isHover} autoRotateSpeed={7.5} />
    </Canvas>
  );
}

// const lights = [
//   [0, 1, 5, 0.1],
//   [0, 2, 0, 0.3],
//   [5, 0, 1, 0.2],
//   [-5, 0, 1, 0.2],
//   [3, 0, 5, 0.6],
// ];
