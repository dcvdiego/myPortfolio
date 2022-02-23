import React from 'react';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { degreesToRadians } from 'popmotion';

interface IIConProps {
  isSelected: boolean;
  isHover: boolean;
}

export default function Model({ isSelected, isHover }: IIConProps) {
  const { nodes, materials }: any = useGLTF(
    'http://localhost:3000/glb/AWSCP.glb'
  );
  return (
    <motion.mesh
      material={materials.AWS}
      geometry={nodes.Circle.geometry}
      rotation={[Math.PI / 2, 0, degreesToRadians(360)]}
      scale={1}
      animate={[isSelected ? 'selected' : 'unselected', isHover ? 'hover' : '']}
      variants={{
        unselected: {
          x: [0, 0],
          y: [0, 0],
          scale: 1,
          rotateY: degreesToRadians(120)
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
