import { PlaneProps, usePlane } from '@react-three/cannon';
import { MeshProps } from '@react-three/fiber';

import { RepeatWrapping, TextureLoader } from 'three';
import placeholder from '../../assets/placeholder.png';

function Ground(props: PlaneProps & MeshProps) {
  const [ref] = usePlane(() => ({
    material: 'ground',
    type: 'Static',
    ...props,
  }));

  const texture = new TextureLoader().load(placeholder);
  // horizontal wrap
  texture.wrapS = RepeatWrapping;
  // vertical wrap
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(240, 240);

  return (
    <mesh ref={ref} receiveShadow {...props}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial map={texture} attach="material" />
    </mesh>
  );
}

export default Ground;
