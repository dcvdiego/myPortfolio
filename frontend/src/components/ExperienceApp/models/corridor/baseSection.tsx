import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { appState } from '../../../../utils/store';

type GLTFResult = GLTF & {
  nodes: {
    Cylinder_3: THREE.Mesh;
    Door: THREE.Mesh;
    Mesh001: THREE.Mesh;
    Mesh001_1: THREE.Mesh;
  };
  materials: {
    ['Mat.1']: THREE.MeshStandardMaterial;
    Mat: THREE.MeshStandardMaterial;
  };
};

interface IBaseSectionProps {
  door?: boolean;
}

export default function BaseSection({
  door,
  ...props
}: JSX.IntrinsicElements['group'] & IBaseSectionProps) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    '/glb/corridorSection.glb'
  ) as GLTFResult;
  if (door && props?.position)
    appState.corridorEnd = (props.position as number[])[2] - 18;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.Cylinder_3.geometry}
        material={nodes.Cylinder_3.material}
        position={[0.38, 2.51, -3.2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      {door && (
        <mesh
          receiveShadow
          geometry={nodes.Door.geometry}
          material={nodes.Door.material}
          position={[0, 0, -6.01]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
      )}

      <group position={[0.486, 0.46, -0.23]}>
        <pointLight
          castShadow
          intensity={0.5}
          decay={2}
          color="#d3eceb"
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          receiveShadow
          geometry={nodes.Mesh001.geometry}
          material={nodes.Mesh001.material}
        />
        <mesh
          receiveShadow
          geometry={nodes.Mesh001_1.geometry}
          material={materials.Mat}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/glb/corridorSection.glb');
