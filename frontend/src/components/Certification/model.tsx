import React, { Ref, useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { degreesToRadians } from 'popmotion';
import { GLTF } from 'three-stdlib';
import { Texture } from 'three';

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

export default function Model({ ...props }) {
  const group = useRef<THREE.Group>();
  const { url, shape, isHover, isSelected } = props;
  const { nodes, materials } = useGLTF(`/glb/${shape}.glb`) as GLTFResult;
  const texture = useTexture(`/img/${url}.png`);
  texture.flipY = shape === 'Hexagon' ? true : false;
  return (
    <group ref={group as Ref<THREE.Group>} dispose={null}>
      <motion.mesh
        material={materials.Material}
        geometry={nodes[shape as keyof typeof nodes]!.geometry}
        rotation={[
          Math.PI / 2,
          shape === 'Circle'
            ? degreesToRadians(285)
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
            scale: 1.4,
          },
        }}
      >
        <meshBasicMaterial attach="material" map={texture as Texture} />
      </motion.mesh>
    </group>
  );
}
