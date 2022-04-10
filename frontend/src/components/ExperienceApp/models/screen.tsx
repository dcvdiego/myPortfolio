import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF, useTexture } from '@react-three/drei';
import tw, { styled } from 'twin.macro';
import { GLTF } from 'three-stdlib';
import Custom404 from '../../../pages/404';
import { TypedDocumentNode, useQuery } from '@apollo/client';
import { Texture } from 'three';

const Wrapper = styled.div`
  ${tw`
  p-2
  `}
`;
const StyledHtml = styled(Html)`
  ${tw`
h-56 
bg-gray-200 
rounded-sm 
overflow-y-auto 
p-0
`}
  width: 334px;
`;
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
  query: TypedDocumentNode;
  Component: JSX.Element;
  screen: number;
  cover: string;
  variable?: any;
}

export default function Screen({
  ...props
}: JSX.IntrinsicElements['group'] & IScreenProps) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF('/glb/screen.glb') as GLTFResult;
  const { query, Component, screen, cover, variable } = props;
  const texture = useTexture(cover);
  (texture as Texture).flipY = false;

  const [hovered, setHovered] = useState(false);
  const over = (e: ThreeEvent<PointerEvent>) => {
    return e.stopPropagation(), setHovered(true);
  };
  const out = () => setHovered(false);
  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  const ComponentClone = () => {
    return React.cloneElement(Component, { componentData: data }, null);
  };
  const { camera } = useThree();
  const { loading, error, data } = useQuery(query, {
    variables: variable,
  });
  useEffect(() => {
    if (screen === 0) return;
    const { x, y, z } = group.current!.position;
    camera.position.set(x - 0.5, y + 2.5, z);
    camera.lookAt(x, y + 2, z);
  }, [screen]);
  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current!.rotation.x = THREE.MathUtils.lerp(
      group.current!.rotation.x,
      Math.cos(t / 2) / 30,
      0.1
    );
    group.current!.rotation.z = THREE.MathUtils.lerp(
      group.current!.rotation.z,
      Math.sin(t / 4) / 30,
      0.1
    );
    group.current!.position.y = THREE.MathUtils.lerp(
      group.current!.position.y,
      (20 + Math.sin(t)) / 80,
      0.1
    );
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={over}
      onPointerOut={out}
    >
      <group rotation-x={-1} position={[0, 5, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 1.9, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes['Cube008'].geometry}
          />
          <mesh
            material={materials['matte.001']}
            geometry={nodes['Cube008_1'].geometry}
          />
          <mesh geometry={nodes['Cube008_2'].geometry}>
            {screen > 0 ? (
              <StyledHtml
                rotation-x={-Math.PI / 2}
                position={[0, 0.05, -0.09]}
                transform
                occlude
              >
                <Wrapper>
                  {/* jsx element cannot have link from router, cannot have Layout, graphql queries have to be done here and passed through */}
                  {error || loading ? <Custom404 /> : <ComponentClone />}
                </Wrapper>
              </StyledHtml>
            ) : (
              <meshBasicMaterial attach="material" map={texture as Texture} />
            )}
          </mesh>
        </group>
      </group>
    </group>
  );
}
