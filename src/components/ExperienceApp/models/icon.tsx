import { useGLTF } from '@react-three/drei';
import { degreesToRadians } from 'popmotion';
import React from 'react';
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

function Icon() {
  const { nodes, materials } = useGLTF(
    ` /glb/AWSCP.glb`
  ) as unknown as GLTFResult;
  return (
    <group dispose={null} position={[-18, 5, -72]} scale={2}>
      <mesh
        material={materials.Material}
        geometry={nodes['Hexagon']!.geometry}
        rotation={[Math.PI / 2, degreesToRadians(120), degreesToRadians(360)]}
        scale={1}
      />
    </group>
  );
}

export default Icon;
