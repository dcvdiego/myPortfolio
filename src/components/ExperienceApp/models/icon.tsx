import { useGLTF } from '@react-three/drei';
import { degreesToRadians } from 'popmotion';
import React from 'react';

function Icon() {
  const { nodes, materials }: any = useGLTF(
    `http://localhost:3000/glb/AWSCP.glb`
  );
  return (
    <group dispose={null} position={[-18, 5, -72]} scale={2}>
      <mesh
        material={materials.Material}
        geometry={nodes['Hexagon'].geometry}
        rotation={[Math.PI / 2, degreesToRadians(120), degreesToRadians(360)]}
        scale={1}
      />
    </group>
  );
}

export default Icon;
