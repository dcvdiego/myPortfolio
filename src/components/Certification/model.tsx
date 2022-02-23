import React from 'react';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { degreesToRadians } from 'popmotion';

interface IIConProps {
  isLiked: boolean;
  isHover: boolean;
}

export default function Model({ isLiked, isHover }: IIConProps) {
  const { nodes }: any = useGLTF('http://localhost:3000/glb/AWSCP.glb');
  return (
    <motion.mesh
      geometry={nodes.Circle.geometry}
      rotation={[Math.PI / 2, 0, degreesToRadians(360)]}
      scale={1}
      animate={[isLiked ? 'liked' : 'unliked', isHover ? 'hover' : '']}
      variants={{
        unliked: {
          x: [0, 0],
          y: [0, 0],
          scale: 1
        },
        liked: {
          x: 4,
          y: [0, -1.5, 2],
          scale: 1,
          transition: { duration: 0.7 }
        },
        hover: {
          rotateZ: 0,
          scale: 1.4,
          transition: {
            rotateZ: { duration: 1.5, ease: 'linear', repeat: Infinity }
          }
        }
      }}
    >
      {/* <meshPhongMaterial color="#ff0" emissive="#ff5900" specular="#777" /> */}
    </motion.mesh>
  );
}
