import { useFrame, useThree } from '@react-three/fiber';
import { Ref, useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import usePlayerControls from '../../hooks/useKeyboardControls';
import AvatarModel from '../AvatarModel/model';
import { isMobile } from 'react-device-detect';
import { ActionName, LocationName } from '../AvatarModel/avatarModel.types';
import * as THREE from 'three';
import { appState } from '../../utils/store';

let rotateVector = new Vector3(0, 1, 0);
let moveX;
let moveZ;
let rotateAngleTouch;
let rotateAngle;
let moveDistance;

interface IPlayerMovementProps {
  AutoWalk: boolean;
  location: LocationName;
  screen?: boolean;
  setTransparent: any;
}
export default function PlayerMovement({
  AutoWalk,
  location,
  screen,
  setTransparent,
}: IPlayerMovementProps) {
  const model = useRef<THREE.Group>();

  const { camera } = useThree();

  const [mousePosition, action, movement] = usePlayerControls(AutoWalk) as [
    { x: number; y: number },
    ActionName,
    {
      forward: boolean;
      backward: boolean;
      left: boolean;
      right: boolean;
      shift: boolean;
    }
  ];
  const { forward, backward, left, right, shift } = movement;
  let relativeCameraOffset = new Vector3();
  let cameraOffset;

  useEffect(() => {
    if (screen) return;
    const { x, y, z } = model.current!.position;
    camera.lookAt(x, y + 3.5, z);
    camera.position.set(x + 0, y + 4, z + 8);
  }, []);

  useFrame((_state, delta) => {
    if (screen) return;
    moveDistance = delta * 12;
    moveZ = delta * 10 * mousePosition.y;
    moveX = delta * 10 * mousePosition.x;
    rotateAngleTouch = (Math.PI / 2) * delta * 1.5 * mousePosition.x;
    rotateAngle = (Math.PI / 2) * delta * 1.5;

    if (isMobile) {
      model.current!.translateZ(moveZ);
      model.current!.translateX(moveX);
      model.current!.rotateOnAxis(rotateVector, -rotateAngleTouch);
    } else {
      if (forward) {
        if (!shift) {
          model.current!.translateZ(-moveDistance / 2);
        } else {
          model.current!.translateZ(-moveDistance);
        }
      }
      if (backward) {
        model.current!.translateZ(moveDistance);
      }
      if (left) {
        model.current!.rotateOnAxis(rotateVector, rotateAngle);
      }
      if (right) {
        model.current!.rotateOnAxis(rotateVector, -rotateAngle);
      }
    }

    relativeCameraOffset.set(0, 2.5, 3);
    cameraOffset = relativeCameraOffset.applyMatrix4(
      model.current!.matrixWorld
    );
    camera.position.lerp(cameraOffset, 0.05);

    camera.lookAt(
      model.current!.position.x + 0,
      model.current!.position.y + 3.5,
      model.current!.position.z + 0
    );
    // border control :)
    if (model.current && model.current.position.z > -62.5)
      model.current.position.z = -62.5;
    if (model.current && model.current.position.z < appState.corridorEnd)
      model.current.position.z = appState.corridorEnd;
    if (model.current && model.current.position.x > -2)
      model.current.position.x = -2;

    if (model.current && model.current.position.x < -20)
      model.current.position.x = -20;

    if (camera.position.x < -21.5 || camera.position.x > -0) {
      setTransparent(true);
    } else {
      setTransparent(false);
    }
  });

  return (
    <AvatarModel
      position={[-11, 1, -62]}
      scale={2}
      ref={model as Ref<THREE.Group>}
      action={action}
      location={location}
      castShadow
      screen={screen}
    />
  );
}
