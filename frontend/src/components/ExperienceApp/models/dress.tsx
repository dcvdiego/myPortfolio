/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { Ref, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    dress_: THREE.Mesh;
    dressDetails: THREE.Mesh;
    mannequin: THREE.Mesh;
  };
  materials: {
    ['Material.003']: THREE.MeshStandardMaterial;
    ['Material.002']: THREE.MeshStandardMaterial;
    ['Material.013']: THREE.MeshStandardMaterial;
  };
};

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF('/glb/dress.glb') as GLTFResult;
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current!.rotation.x = THREE.MathUtils.lerp(
      group.current!.rotation.x,
      Math.cos(t / 2) / 10 + 0.25,
      0.1
    );
    group.current!.rotation.y = THREE.MathUtils.lerp(
      group.current!.rotation.y,
      t,
      0.1
    );
    group.current!.rotation.z = THREE.MathUtils.lerp(
      group.current!.rotation.z,
      Math.sin(t / 4) / 20,
      0.1
    );
    group.current!.position.y = THREE.MathUtils.lerp(
      group.current!.position.y,
      (-5 + Math.sin(t)) / 5,
      0.1
    );
  });

  return (
    <group ref={group as Ref<THREE.Group>} {...props} dispose={null}>
      <mesh
        geometry={nodes.dress_.geometry}
        material={materials['Material.003']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.000974}
      >
        <meshPhongMaterial color="white" emissive="black" reflectivity={0.5} />
      </mesh>
      <mesh
        geometry={nodes.dressDetails.geometry}
        material={materials['Material.002']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.000974}
      >
        <meshPhongMaterial color="white" emissive="pink" reflectivity={0.5} />
      </mesh>
      <mesh
        geometry={nodes.mannequin.geometry}
        material={materials['Material.013']}
        position={[0.096501, 0.079601, -0.003348]}
        rotation={[0, 0.036283, 0]}
        scale={0.020023}
      >
        <meshBasicMaterial color="pink" />
      </mesh>
    </group>
  );
}

useGLTF.preload('/glb/dress.glb');
