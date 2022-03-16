import React, { useRef, useState, useMemo, useEffect, FC } from 'react';

import * as THREE from 'three';
import { Camera, ThreeEvent, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface IWordProps {
  wordChildren: String | THREE.Vector3;
  position: any;
  onTextClick:
    | React.Dispatch<React.SetStateAction<String | THREE.Vector3>>
    | any;
}

const Word: FC<IWordProps> = ({
  wordChildren,
  onTextClick,
  ...props
}: IWordProps) => {
  const color = new THREE.Color();
  const fontProps = {
    font: '/Inter-Bold.woff',
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false,
  };
  const ref = useRef<Camera | any>();
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
    ref!.current!.material.color.lerp(
      color.set(hovered ? '#5e2dff' : 'gray'),
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
  onTextClick:
    | React.Dispatch<React.SetStateAction<String | THREE.Vector3>>
    | any;
}
export default function Cloud({
  dist = 5,
  radius = 20,
  data,
  onTextClick,
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
  return words.map(([pos, word], index) => (
    <Word
      key={index}
      position={pos}
      wordChildren={word}
      onTextClick={onTextClick}
    />
  ));
}
