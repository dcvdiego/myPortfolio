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
    Vr_Controller_1: THREE.Mesh;
    Vr_Controller_1001: THREE.Mesh;
    Vr_controller_2: THREE.Mesh;
    Vr_controller_2001: THREE.Mesh;
    VR1: THREE.Mesh;
    Vr2: THREE.Mesh;
    Vr2001: THREE.Mesh;
    VR3: THREE.Mesh;
    Vr4: THREE.Mesh;
    Vr5: THREE.Mesh;
    Vr6: THREE.Mesh;
    Plane001: THREE.Mesh;
  };
  materials: {
    ['oculus controller']: THREE.MeshStandardMaterial;
    ['Material.021']: THREE.MeshStandardMaterial;
    Fabric: THREE.MeshStandardMaterial;
    ['Material.020']: THREE.MeshStandardMaterial;
  };
};

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF('/glb/headset.glb') as GLTFResult;
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
      (20 + Math.sin(t)) / 5,
      0.1
    );
  });
  return (
    <group ref={group as Ref<THREE.Group>} {...props} dispose={null}>
      <mesh
        geometry={nodes.Vr_Controller_1.geometry}
        material={materials['oculus controller']}
        position={[-0.57, 0.48, -1.07]}
        rotation={[-0.02, -0.49, 3.13]}
        scale={[0.08, 0.24, 0.11]}
      />
      <mesh
        geometry={nodes.Vr_Controller_1001.geometry}
        material={materials['oculus controller']}
        position={[0.17, 0.48, 0.75]}
        rotation={[-0.04, -1.07, 3.11]}
        scale={[0.08, 0.24, 0.11]}
      />
      <mesh
        geometry={nodes.Vr_controller_2.geometry}
        material={materials['oculus controller']}
        position={[-0.59, 0.06, -1.08]}
        rotation={[-0.02, -0.49, 3.13]}
        scale={[0.15, 0.21, 0.15]}
      />
      <mesh
        geometry={nodes.Vr_controller_2001.geometry}
        material={materials['oculus controller']}
        position={[0.16, 0.06, 0.73]}
        rotation={[-0.04, -1.07, 3.11]}
        scale={[0.15, 0.21, 0.15]}
      />
      <mesh
        geometry={nodes.VR1.geometry}
        material={materials['Material.021']}
        position={[0.79, 0.31, 1.77]}
        rotation={[0, 0.41, 0]}
        scale={[0.33, 0.28, 0.31]}
      />
      <mesh
        geometry={nodes.Vr2.geometry}
        material={materials.Fabric}
        position={[-0.11, 0.31, 0.22]}
        rotation={[1.6, -0.01, -0.37]}
        scale={[0.39, 0.33, 0.11]}
      />
      <mesh
        geometry={nodes.Vr2001.geometry}
        material={materials.Fabric}
        position={[-0.59, 0.33, -0.9]}
        rotation={[1.6, -0.01, -0.48]}
        scale={[0.39, 0.33, 0.11]}
      />
      <mesh
        geometry={nodes.VR3.geometry}
        material={materials['Material.020']}
        position={[0.35, 0.07, 0.1]}
        rotation={[0, 0.41, 0]}
        scale={[0.16, 0.14, 0.15]}
      />
      <mesh
        geometry={nodes.Vr4.geometry}
        material={materials['Material.020']}
        position={[0.35, 0.56, 0.09]}
        rotation={[0, 0.41, 0]}
        scale={[0.16, 0.14, 0.15]}
      />
      <mesh
        geometry={nodes.Vr5.geometry}
        material={materials['Material.020']}
        position={[-0.03, 0.07, -0.78]}
        rotation={[0, 0.41, 0]}
        scale={[0.16, 0.14, 0.15]}
      />
      <mesh
        geometry={nodes.Vr6.geometry}
        material={materials['Material.020']}
        position={[-0.03, 0.56, -0.78]}
        rotation={[0, 0.41, 0]}
        scale={[0.16, 0.14, 0.15]}
      />
      <mesh
        geometry={nodes.Plane001.geometry}
        material={materials.Fabric}
        position={[-0.76, 0.56, 0.03]}
        rotation={[0, 0.4, 0]}
        scale={[0.71, 1, 0.09]}
      />
    </group>
  );
}

useGLTF.preload('/headset.glb');
