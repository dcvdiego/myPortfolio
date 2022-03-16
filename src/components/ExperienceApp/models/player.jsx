import { forwardRef, useLayoutEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';

import { useSnapshot } from 'valtio';
import state from '../../../utils/store';

export const Player = forwardRef((props, ref) => {
  const { action } = props;
  const snap = useSnapshot(state);
  const { animations } = useGLTF('http://localhost:3000/glb/modelwanim.glb');
  const { scene, materials, nodes } = useGLTF(
    `http://localhost:3000/glb/${snap.avatarName}.glb`
  );

  const { actions } = useAnimations(animations, ref);

  useLayoutEffect(() => {
    actions[action].reset().fadeIn(0.5).play();

    return () => actions[action].fadeOut(0.5);
  }, [action, actions]);

  return (
    <group castShadow {...props} ref={ref} dispose={null}>
      <group rotation={[0, -Math.PI, 0]}>
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
    </group>
  );
});

// useGLTF.preload('http://localhost:3000/glb/modelwanim.glb');

export default Player;
