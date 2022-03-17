import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import usePrevious from '../../hooks/usePrevious';
import { LoopOnce } from 'three';
import { useSnapshot } from 'valtio';
import { useFrame, useThree } from '@react-three/fiber';
import { moveJoint } from '../../utils/modelHelpers';
import { GLTF } from 'three-stdlib';
import state from '../../utils/store';

type ActionName = 'Dance' | 'Idle' | 'Run' | 'Walk' | 'Wave';

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Wolf3D_Body: THREE.SkinnedMesh;
    Wolf3D_Hair: THREE.SkinnedMesh;
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
    Wolf3D_Outfit_Top: THREE.SkinnedMesh;
    EyeLeft: THREE.SkinnedMesh;
    EyeRight: THREE.SkinnedMesh;
    Wolf3D_Head: THREE.SkinnedMesh;
    Wolf3D_Teeth: THREE.SkinnedMesh;
    Hips: THREE.Bone;
    Neck: THREE.Bone;
  };
  materials: {
    Wolf3D_Body: THREE.MeshStandardMaterial;
    Wolf3D_Hair: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
    Wolf3D_Eye: THREE.MeshStandardMaterial;
    Wolf3D_Skin: THREE.MeshStandardMaterial;
    Wolf3D_Teeth: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

interface IModelProps {
  action: ActionName;
}

export default function Model({
  ...props
}: JSX.IntrinsicElements['group'] & IModelProps) {
  const { action } = props;
  const group = useRef<THREE.Group>();
  const snap = useSnapshot(state);
  const { animations } = useGLTF(
    'http://localhost:3000/glb/modelwanim.glb'
  ) as unknown as GLTFResult;
  const { nodes, materials } = useGLTF(
    `http://localhost:3000/glb/${snap.avatarName}.glb`
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const previousAction: ActionName = usePrevious(action);
  useEffect(() => {
    if (previousAction) {
      actions[previousAction]!.fadeOut(0.8);
      actions[previousAction]!.stop();
      actions[action]!.setLoop(LoopOnce, 1);
    }
    actions[action]!.play();
    actions[action]!.fadeIn(0.8);
    // while (actions[action].isRunning()) {}
    actions[action]!.fadeOut(8);
    actions.Idle!.play();
  }, [actions, action, previousAction]);
  // 1 argument but got 0, but it does not need an argument, ts error?
  // @ts-ignore
  const [mixer] = useState(() => new THREE.AnimationMixer());
  useFrame((_fState, delta) => mixer.update(delta));
  const { size } = useThree();
  useFrame((fState, delta) => {
    const mouse = {
      x: size.width / 2 + (fState.mouse.x * size.width) / 2,
      y: size.height / 2 + (-fState.mouse.y * size.height) / 2,
    };
    mixer.update(delta);
    // every joint to move you must specify the bone in the GLTF type
    moveJoint(mouse, nodes.Neck);
  });
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (
        e.stopPropagation(),
        (state.current =
          // this is an error with ts, should be fixed soon I hope
          // @ts-ignore
          e.object.material.name.replace('Wolf3D_Outfit_', '') === 'Top' ||
          // @ts-ignore
          e.object.material.name.replace('Wolf3D_Outfit_', '') === 'Bottom' ||
          // @ts-ignore
          e.object.material.name.replace('Wolf3D_Outfit_', '') === 'Footwear'
            ? // @ts-ignore
              e.object.material.name.replace('Wolf3D_Outfit_', '')
            : null)
      )}
    >
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Hair"
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Bottom"
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        material-color={snap.items.Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Footwear"
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        material-color={snap.items.Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Top"
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        material-color={snap.items.Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={nodes.EyeLeft.material}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={nodes.EyeRight.material}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}
// how do we define name outside without using context or redux, for better perf (preload)
useGLTF.preload(`http://localhost:3000/glb/${state.avatarName}.glb`);
