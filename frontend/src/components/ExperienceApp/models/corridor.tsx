import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

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
export default function Corridor({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    '/glb/corridor.glb'
  ) as unknown as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[-0.27, 0.67, -13.99]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <group position={[52.44, -462.51, 4.1]}>
          <group position={[0, 1570, 0]}>
            <pointLight
              castShadow
              intensity={0.5}
              decay={2}
              // color="#cdacb5"
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
          <group position={[0, 942, 0]}>
            <pointLight
              intensity={0.5}
              decay={2}
              // color="#ccb9d4"
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
          <group position={[0, 314, 0]}>
            <pointLight
              castShadow
              intensity={0.5}
              decay={2}
              // color="#a5b2c1"
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
          <group position={[0, -314, 0]}>
            <pointLight
              intensity={0.5}
              decay={2}
              // color="#93b995"
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
          <group position={[0, -942, 0]}>
            <pointLight
              castShadow
              intensity={0.5}
              decay={2}
              // color="#92afbb"
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
          <group position={[0, -1570, 0]}>
            <pointLight
              intensity={0.5}
              decay={2}
              // color="#9a97c3"
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
        <mesh
          receiveShadow
          geometry={nodes.Cylinder_3.geometry}
          material={nodes.Cylinder_3.material}
          position={[64.85, 1078.8, -183.55]}
        />
        <mesh
          receiveShadow
          geometry={nodes.Door.geometry}
          material={nodes.Door.material}
          position={[26.54, -2356.38, 67.48]}
        />
        <group position={[26.54, 1398.63, 67.48]}>
          <mesh
            receiveShadow
            geometry={nodes.Mesh001.geometry}
            material={nodes.Mesh001.material}
          />
          <mesh
            receiveShadow
            geometry={nodes.Mesh001_1.geometry}
            material={materials.Mat}
          >
            <meshPhysicalMaterial
              color="#d7a2ff"
              emissive="#ecb7ff"
              reflectivity={1}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/glb/corridor.glb');
