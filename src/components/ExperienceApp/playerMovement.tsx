import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import usePlayerControls from '../../hooks/useKeyboardControls';
import Player from './Player';
import { isMobile } from 'react-device-detect';

let rotateVector = new Vector3(0, 1, 0);
let moveX;
let moveZ;
let rotateAngleTouch;
let rotateAngle;
let moveDistance;

export default function PlayerMovement() {
  const model = useRef();
  const { camera } = useThree();

  const [mousePosition, action, { forward, backward, left, right, shift }] =
    usePlayerControls();
  let relativeCameraOffset = new Vector3();
  let cameraOffset;

  useEffect(() => {
    const { x, y, z } = model.current.position;
    camera.lookAt(x, y + 3.5, z);
    camera.position.set(x + 0, y + 4, z + 8);
  }, []);

  useFrame((state, delta) => {
    moveDistance = delta * 12;
    moveZ = delta * 40 * mousePosition.y;
    moveX = delta * 20 * mousePosition.x;
    rotateAngleTouch = (Math.PI / 2) * delta * 1.5 * mousePosition.x;
    rotateAngle = (Math.PI / 2) * delta * 1.5;

    if (isMobile) {
      model.current.translateZ(moveZ);
      model.current.translateX(moveX);
      model.current.rotateOnAxis(rotateVector, -rotateAngleTouch);
    } else {
      if (forward) {
        if (!shift) {
          model.current.translateZ(-moveDistance / 2);
        } else {
          model.current.translateZ(-moveDistance);
        }
      }
      if (backward) {
        model.current.translateZ(moveDistance);
      }
      if (left) {
        model.current.rotateOnAxis(rotateVector, rotateAngle);
      }
      if (right) {
        model.current.rotateOnAxis(rotateVector, -rotateAngle);
      }
    }

    relativeCameraOffset.set(0, 2.5, 3);
    cameraOffset = relativeCameraOffset.applyMatrix4(model.current.matrixWorld);
    camera.position.lerp(cameraOffset, 0.05);

    camera.lookAt(
      model.current.position.x + 0,
      model.current.position.y + 3.5,
      model.current.position.z + 0
    );
  });

  return (
    <Player position={[-11, 1, -62]} scale={2} ref={model} action={action} />
  );
}
