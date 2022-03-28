import { useGLTF } from '@react-three/drei';
import { Camera, useFrame } from '@react-three/fiber';
import { degreesToRadians } from 'popmotion';
import React, { useRef } from 'react';
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
  const ref = useRef<Camera>();
  useFrame(({ camera }) => {
    // face the camera
    ref!.current!.quaternion.copy(camera!.quaternion);
  });

  return (
    <group ref={ref} dispose={null} position={[-16, 5, -72]} scale={1}>
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
