import React from 'react';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { degreesToRadians } from 'popmotion';

interface IIConProps {
  isSelected: boolean;
  isHover: boolean;
  url: string;
}

export default function Model({ isHover, isSelected, url }: IIConProps) {
  const { nodes, materials }: any = useGLTF(
    `http://localhost:3000/glb/${url}.glb`
  );
  console.log(nodes);
  const shape = url === 'AWSCP' ? 'Circle' : 'Cube';
  return (
    <motion.mesh
      material={materials.Material}
      geometry={nodes[shape].geometry}
      rotation={[Math.PI / 2, degreesToRadians(120), degreesToRadians(360)]}
      scale={1}
      animate={[isSelected ? 'selected' : 'unselected', isHover ? 'hover' : '']}
      variants={{
        unselected: {
          x: [0, 0],
          y: [0, 0],
          scale: 1
        },
        selected: {
          x: 4,
          y: [0, -1.5, 2],
          scale: 1,
          transition: { duration: 0.7 }
        },
        hover: {
          rotateX: 0,
          scale: 1.4,
          transition: {
            rotateX: {
              duration: 1.5,
              ease: 'linear',
              repeat: Infinity
            }
          }
        }
      }}
    />
  );
}
