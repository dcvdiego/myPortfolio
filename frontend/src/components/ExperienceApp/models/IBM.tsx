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
    Mesh: THREE.Mesh;
    Mesh_1: THREE.Mesh;
    Mesh_2: THREE.Mesh;
  };
  materials: {
    ['dbl_IBM Logo_001']: THREE.MeshStandardMaterial;
    ['dbl_IBM Logo_002']: THREE.MeshStandardMaterial;
    ['dbl_IBM Logo_003']: THREE.MeshStandardMaterial;
  };
};

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF('/glb/IBM.glb') as GLTFResult;
  useFrame(({ camera }) => {
    // face the camera
    group!.current!.quaternion.copy(camera!.quaternion);
  });
  return (
    <group ref={group as Ref<THREE.Group>} {...props} dispose={null}>
      <group position={[-5.32, -0.93, 1.57]} scale={0.03}>
        <mesh
          geometry={nodes.Mesh.geometry}
          material={materials['dbl_IBM Logo_001']}
          material-color={'darkblue'}
        />
        <mesh
          geometry={nodes.Mesh_1.geometry}
          material={materials['dbl_IBM Logo_002']}
          material-color={'darkblue'}
        />
        <mesh
          geometry={nodes.Mesh_2.geometry}
          material={materials['dbl_IBM Logo_003']}
          material-color={'darkblue'}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/glb/IBM.glb');
