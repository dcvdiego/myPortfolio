import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { degreesToRadians } from 'popmotion';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Hexagon?: THREE.Mesh;
    Plane?: THREE.Mesh;
    Circle?: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};
interface IIConProps {
  isSelected: boolean;
  isHover: boolean;
  url: string;
  shape: 'Circle' | 'Plane' | 'Hexagon';
}

export default function Icon({ isHover, isSelected, url, shape }: IIConProps) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    ` /glb/${url}.glb`
  ) as unknown as GLTFResult;
  return (
    <Canvas
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
    >
      {lights.map(([x, y, z, intensity]) => (
        <pointLight
          intensity={intensity}
          position={[x / 8, y / 8, z / 4]}
          color="#fff"
        />
      ))}
      <group ref={group} dispose={null}>
        <motion.mesh
          material={materials.Material}
          geometry={nodes[shape]!.geometry}
          rotation={[
            Math.PI / 2,
            shape === 'Circle'
              ? degreesToRadians(298)
              : shape === 'Hexagon'
              ? degreesToRadians(120)
              : degreesToRadians(180),
            degreesToRadians(360),
          ]}
          scale={1}
          animate={[
            isSelected ? 'selected' : 'unselected',
            isHover ? 'hover' : '',
          ]}
          variants={{
            unselected: {
              x: [0, 0],
              y: [0, 0],
              scale: 1,
            },
            selected: {
              x: 4,
              y: [0, -1.5, 2],
              scale: 1,
              transition: { duration: 0.7 },
            },
            hover: {
              rotateZ: 0,
              scale: 1.4,
              transition: {
                rotateZ: {
                  duration: 1.5,
                  ease: 'linear',
                  repeat: Infinity,
                },
              },
            },
          }}
        />
      </group>
    </Canvas>
  );
}

const lights = [
  [0, 1, 5, 0.1],
  [0, 2, 0, 0.3],
  [5, 0, 1, 0.2],
  [-5, 0, 1, 0.2],
  [3, 0, 5, 0.6],
];
