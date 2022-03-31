import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import { styled } from 'twin.macro';
import { GLTF } from 'three-stdlib';
import Custom404 from '../../../pages/404';
import { TypedDocumentNode, useQuery } from '@apollo/client';

const Wrapper = styled.div`
  padding: 10px;
  /* width: 668px;
  height: auto; */
  /* transform: scale(0.5); */
  /* transform-origin: top left; */
`;
const StyledHtml = styled(Html)`
  width: 334px;
  height: 216px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow-y: auto;
  padding: 0;
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
}

export default function Screen({
  ...props
}: JSX.IntrinsicElements['group'] & IScreenProps) {
  const group = useRef<THREE.Group>();
  // Load model
  const { nodes, materials } = useGLTF(
    '/glb/screen.glb'
  ) as unknown as GLTFResult;
  const { query, Component } = props;

  const ComponentClone = () => {
    return React.cloneElement(Component, { componentData: data }, null);
  };

  const { loading, error, data } = useQuery(query);

  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current!.rotation.x = THREE.MathUtils.lerp(
      group.current!.rotation.x,
      Math.cos(t / 2) / 10 + 0.25,
      0.1
    );
    group.current!.rotation.y = THREE.MathUtils.lerp(
      group.current!.rotation.y,
      Math.sin(t / 4) / 10,
      0.1
    );
    group.current!.rotation.z = THREE.MathUtils.lerp(
      group.current!.rotation.z,
      Math.sin(t / 4) / 20,
      0.1
    );
    group.current!.position.y = THREE.MathUtils.lerp(
      group.current!.position.y,
      (-5 + Math.sin(t)) / 5,
      0.1
    );
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={-0.425} position={[0, 5, 0.41]}>
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
          </mesh>
        </group>
      </group>
    </group>
  );
}