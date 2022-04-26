import CERTIFICATIONS_QUERY from '../../../graphql/Certification/certifications';
import { useQuery } from '@apollo/client';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { degreesToRadians } from 'popmotion';
import React, { Ref, useEffect, useRef, useState } from 'react';
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
  const [index, setIndex] = useState<number>(0);
  const [iconObject, setIconObject] = useState({
    threedid: 'AWSCP',
    shape: 'Hexagon',
  });
  const { loading, error, data } = useQuery(CERTIFICATIONS_QUERY);
  const randomObject = (array: any[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  useEffect(() => {
    const tick = () => setIndex((i) => i + 1);
    const id = setInterval(tick, 7000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!loading && !error) {
      setIconObject(
        randomObject(data?.certifications.data[0].attributes.Certification)
      );
    }
  }, [index]);
  let url = (iconObject as any)?.threedid;
  let shape = (iconObject as any)?.shape;
  let { nodes } = useGLTF(`/glb/${shape}.glb`) as GLTFResult;
  let texture = useTexture(`/img/${url}.png`);
  texture.flipY = shape === 'Hexagon' ? true : false;
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipMapLinearFilter;
  const ref = useRef<THREE.Group>();
  useFrame(({ camera }) => {
    // face the camera
    ref!.current!.quaternion.copy(camera!.quaternion);
  });

  return (
    <group ref={ref as Ref<THREE.Group>} {...props} dispose={null} scale={1}>
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
