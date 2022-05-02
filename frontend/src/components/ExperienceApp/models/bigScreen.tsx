import * as THREE from 'three';
import React, { Ref, useEffect, useRef, useState } from 'react';

import { Html, useGLTF, useTexture } from '@react-three/drei';

import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Cube008: THREE.Mesh;
    Cube008_1: THREE.Mesh;
    Cube008_2: THREE.Mesh;
  };
  materials: {
    aluminium: THREE.MeshStandardMaterial;
    ['matte.001']: THREE.MeshStandardMaterial;
    ['screen.001']: THREE.MeshStandardMaterial;
  };
};
interface IScreenProps {
  url: string;
}

export default function BigScreen({
  ...props
}: JSX.IntrinsicElements['group'] & IScreenProps) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF('/glb/screen.glb') as GLTFResult;
  const { url } = props;
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: url,
      crossOrigin: 'Anonymous',
      loop: true,
      muted: true,
    })
  );
  useEffect(() => void video.play(), [video]);

  return (
    <group
      ref={group as Ref<THREE.Group>}
      {...props}
      scale={1}
      rotation={[0, -Math.PI / 2, 0]}
      dispose={null}
    >
      <group position={[0, 5, 0.41]}>
        <group
          position={[0, 2.96, -0.13]}
          rotation={[Math.PI / 1.9, Math.PI, 0]}
        >
          <mesh
            material={materials.aluminium}
            geometry={nodes['Cube008'].geometry}
          />
          <mesh
            material={materials['matte.001']}
            geometry={nodes['Cube008_1'].geometry}
          />
          <mesh geometry={nodes['Cube008_2'].geometry} scale={[-1, 1, 1]}>
            <meshBasicMaterial toneMapped={false}>
              <videoTexture
                attach="map"
                args={[video]}
                encoding={THREE.sRGBEncoding}
              />
            </meshBasicMaterial>
          </mesh>
        </group>
      </group>
    </group>
  );
}
