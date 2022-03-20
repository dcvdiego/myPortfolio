import React, { useRef, useState, useMemo, useEffect, FC } from 'react';

import * as THREE from 'three';
import { Camera, ThreeEvent, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { MeshBasicMaterial } from 'three';

interface IWordProps {
  wordChildren: string;
  position: THREE.Vector3;
  onTextClick: React.Dispatch<React.SetStateAction<string>>;
  origin: string;
}

const Word: FC<IWordProps> = ({
  wordChildren,
  onTextClick,
  origin,
  ...props
}: IWordProps) => {
  const color = new THREE.Color();
  const fontProps = {
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false,
  };

  const ref = useRef<Camera & THREE.Mesh>();
  const [hovered, setHovered] = useState(false);
  const over = (e: ThreeEvent<PointerEvent>) => {
    return e.stopPropagation(), setHovered(true);
  };
  const out = () => setHovered(false);
  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  // Tie component to the render-loop
  useFrame(({ camera }) => {
    // Make text face the camera
    ref!.current!.quaternion.copy(camera!.quaternion);
    // Animate font color
    (ref.current!.material as MeshBasicMaterial).color.lerp(
      color.set(hovered ? (origin === 'app' ? '#ff4c2d' : '#5e2dff') : 'gray'),
      0.1
    );
  });
  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      onClick={() => onTextClick(wordChildren)}
      {...props}
      {...fontProps}
      children={wordChildren}
    />
  );
};
interface ICloudProps {
  dist: number;
  radius: number;
  data: Array<String>;
  onTextClick: React.Dispatch<React.SetStateAction<string>>;

  origin: string;
}
export default function Cloud({
  dist = 5,
  radius = 20,
  data,
  onTextClick,
  origin,
}: ICloudProps) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (dist + 1);
    const thetaSpan = (Math.PI * 2) / dist;
    // Taken from https://discourse.threejs.org/t/can-i-place-obects-on-a-sphere-surface-evenly/4773/6
    for (let j = 0; j < data.length; j += 1)
      temp.push([
        new THREE.Vector3().setFromSpherical(
          spherical.set(radius, phiSpan * j + 1, thetaSpan * j + 1)
        ),
        data[j],
      ]);
    return temp;
  }, [dist, radius, data]);

  return origin === 'app' ? (
    <group dispose={null} position={[-18, 5, -72]} scale={0.06}>
      {words.map(([pos, word], index) => (
        <Word
          key={index}
          position={pos as THREE.Vector3}
          wordChildren={word as string}
          onTextClick={onTextClick}
          origin={origin}
        />
      ))}
    </group>
  ) : (
    <>
      {words.map(([pos, word], index) => (
        <Word
          key={index}
          position={pos as THREE.Vector3}
          wordChildren={word as string}
          onTextClick={onTextClick}
          origin={origin}
        />
      ))}
    </>
  );
}
