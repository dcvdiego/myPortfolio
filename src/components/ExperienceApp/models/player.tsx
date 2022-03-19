import { forwardRef, useLayoutEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

import { GLTF } from 'three-stdlib';
import { useSnapshot } from 'valtio';
import state from '../../../utils/store';

type ActionName = 'Dance' | 'Idle' | 'Run' | 'Walk' | 'Wave';

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Wolf3D_Body?: THREE.SkinnedMesh;
    Wolf3D_Facewear?: THREE.SkinnedMesh;
    Wolf3D_Glasses?: THREE.SkinnedMesh;
    Wolf3D_Headwear?: THREE.SkinnedMesh;
    Wolf3D_Hair?: THREE.SkinnedMesh;
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
    Wolf3D_Body?: THREE.MeshStandardMaterial;
    Wolf3D_Facewear?: THREE.MeshStandardMaterial;
    Wolf3D_Glasses?: THREE.MeshStandardMaterial;
    Wolf3D_Headwear?: THREE.MeshStandardMaterial;
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
  position?: number[];
  scale?: number;
}

export const Player = forwardRef<
  THREE.Group,
  JSX.IntrinsicElements['group'] & IModelProps
>((props, ref) => {
  const { action } = props;
  const snap = useSnapshot(state);
  const { animations } = useGLTF(
    ' /glb/modelwanim.glb'
  ) as unknown as GLTFResult;
  const { materials, nodes } = useGLTF(
    `${snap.avatarName}`
  ) as unknown as GLTFResult;

  const { actions } = useAnimations(
    animations,
    ref as React.MutableRefObject<THREE.Group | undefined>
  );

  useLayoutEffect(() => {
    actions[action]!.reset().fadeIn(0.5).play();

    return () => {
      actions[action]!.fadeOut(0.5);
    };
  }, [action, actions]);

  return (
    <group castShadow {...props} ref={ref}>
      <group rotation={[0, -Math.PI, 0]}>
        <primitive object={nodes.Hips} />
        {nodes?.Wolf3D_Body ? (
          <skinnedMesh
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body?.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body?.skeleton}
          />
        ) : null}{' '}
        {nodes?.Wolf3D_Facewear ? (
          <skinnedMesh
            geometry={nodes.Wolf3D_Facewear.geometry}
            material={materials.Wolf3D_Facewear}
            skeleton={nodes.Wolf3D_Facewear.skeleton}
          />
        ) : null}{' '}
        {nodes?.Wolf3D_Glasses ? (
          <skinnedMesh
            geometry={nodes.Wolf3D_Glasses.geometry}
            material={materials.Wolf3D_Glasses}
            skeleton={nodes.Wolf3D_Glasses.skeleton}
          />
        ) : null}{' '}
        {nodes?.Wolf3D_Headwear ? (
          <skinnedMesh
            geometry={nodes.Wolf3D_Headwear.geometry}
            material={materials.Wolf3D_Headwear}
            skeleton={nodes.Wolf3D_Headwear.skeleton}
          />
        ) : null}{' '}
        {nodes?.Wolf3D_Hair ? (
          <skinnedMesh
            name="Wolf3D_Hair"
            geometry={nodes.Wolf3D_Hair.geometry}
            material={materials.Wolf3D_Hair}
            skeleton={nodes.Wolf3D_Hair.skeleton}
          />
        ) : null}
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
    </group>
  );
});

useGLTF.preload(`${state.avatarName}`);

export default Player;
