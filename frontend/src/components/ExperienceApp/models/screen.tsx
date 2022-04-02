import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF, useTexture } from '@react-three/drei';
import tw, { styled } from 'twin.macro';
import { GLTF } from 'three-stdlib';
import Custom404 from '../../../pages/404';
import { TypedDocumentNode, useQuery } from '@apollo/client';
import logo from '../../../assets/london-fashion-week-logo.png';
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
  screen: boolean;
  setScreen: any;
}

export default function Screen({
  ...props
}: JSX.IntrinsicElements['group'] & IScreenProps) {
  const group = useRef<THREE.Group>();
  const texture = useTexture(logo);
  texture.flipY = false;
  const { nodes, materials } = useGLTF(
    '/glb/screen.glb'
  ) as unknown as GLTFResult;
  const { query, Component, screen, setScreen } = props;

  const ComponentClone = () => {
    return React.cloneElement(Component, { componentData: data }, null);
  };
  const { camera } = useThree();
  const { loading, error, data } = useQuery(query);
  useEffect(() => {
    if (!screen) return;
    const { x, y, z } = group.current!.position;
    camera.position.set(x - 0.2, y + 4.9, z + 0);
    camera.lookAt(x, y, z);
  }, [screen]);
  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current!.rotation.x = THREE.MathUtils.lerp(
      group.current!.rotation.x,
      Math.cos(t / 2) / 10 + 0,
      0.1
    );
    // group.current!.rotation.y = THREE.MathUtils.lerp(
    //   group.current!.rotation.y,
    //   Math.sin(t / 4) / 10,
    //   0.1
    // );
    group.current!.rotation.z = THREE.MathUtils.lerp(
      group.current!.rotation.z,
      Math.sin(t / 4) / 20,
      0.1
    );
    group.current!.position.y = THREE.MathUtils.lerp(
      group.current!.position.y,
      (4 + Math.sin(t)) / 5,
      0.1
    );
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onClick={() => setScreen(true)}
    >
      <group rotation-x={-1} position={[0, 5, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes['Cube008'].geometry}
          />
          <mesh
            material={materials['matte.001']}
            geometry={nodes['Cube008_1'].geometry}
          />
          <mesh geometry={nodes['Cube008_2'].geometry}>
            {screen ? (
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
              <meshBasicMaterial attach="material" map={texture} />
            )}
          </mesh>
        </group>
      </group>
    </group>
  );
}
