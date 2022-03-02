/* eslint-disable no-nested-ternary */
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { degreesToRadians } from 'popmotion';

// TODO:add hexagon shape using blender for AWSCP

interface IIConProps {
  isSelected: boolean;
  isHover: boolean;
  url: string;
  shape: 'Circle' | 'Plane' | 'Hexagon';
}

export default function Model({ isHover, isSelected, url, shape }: IIConProps) {
  const { nodes, materials }: any = useGLTF(
    `http://localhost:3000/glb/${url}.glb`
  );
  return (
    <motion.mesh
      material={materials.Material}
      geometry={nodes[shape].geometry}
      rotation={[
        Math.PI / 2,
        shape === 'Circle'
          ? degreesToRadians(298)
          : shape === 'Hexagon'
          ? degreesToRadians(120)
          : degreesToRadians(180),
        degreesToRadians(360)
      ]}
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
          rotateZ: 0,
          scale: 1.4,
          transition: {
            rotateZ: {
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
