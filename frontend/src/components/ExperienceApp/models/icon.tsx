import { useGLTF, useTexture } from '@react-three/drei';
import { Camera, useFrame } from '@react-three/fiber';
import { degreesToRadians } from 'popmotion';
import React, { useRef } from 'react';
import { LinearMipMapLinearFilter, NearestFilter, Texture } from 'three';
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

function Icon({ ...props }) {
  let { url, shape } = props;
  let { nodes } = useGLTF(`/glb/${shape}.glb`) as GLTFResult;
  let texture = useTexture(`/img/${url}.png`);
  texture.flipY = shape === 'Hexagon' ? true : false;
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipMapLinearFilter;
  const ref = useRef<Camera>();
  useFrame(({ camera }) => {
    // face the camera
    ref!.current!.quaternion.copy(camera!.quaternion);
  });

  return (
    <group ref={ref} {...props} dispose={null} scale={1}>
      <mesh
        // material={materials.Material}
        // @ts-ignore
        geometry={nodes[shape]!.geometry}
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
      >
        <meshBasicMaterial attach="material" map={texture as Texture} />
      </mesh>
    </group>
  );
}

export default Icon;
