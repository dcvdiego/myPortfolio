import * as THREE from 'three';
import React, { useEffect, useState, useRef, Ref } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import usePrevious from '../../../hooks/usePrevious';

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.SkinnedMesh;
    Bottomblack: THREE.SkinnedMesh;
    Bottomgrey: THREE.SkinnedMesh;
    BottomheartPants: THREE.SkinnedMesh;
    FootwearbigWhiteTrainers: THREE.SkinnedMesh;
    FootwearblackBoots: THREE.SkinnedMesh;
    FootwearblackWork: THREE.SkinnedMesh;
    FootwearwhiteLow: THREE.SkinnedMesh;
    Hair: THREE.SkinnedMesh;
    TopwhiteTop: THREE.SkinnedMesh;
    TopyellowHoodie: THREE.SkinnedMesh;
    EyeLeft: THREE.SkinnedMesh;
    EyeRight: THREE.SkinnedMesh;
    Head: THREE.SkinnedMesh;
    Teeth: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Body: THREE.MeshStandardMaterial;
    ['Bottom.black']: THREE.MeshStandardMaterial;
    ['Bottom.grey']: THREE.MeshStandardMaterial;
    ['Bottom.heartPants']: THREE.MeshStandardMaterial;
    ['Footwear.bigWhiteTrainers']: THREE.MeshStandardMaterial;
    ['Footwear.blackBoots']: THREE.MeshStandardMaterial;
    ['Footwear.blackWork']: THREE.MeshStandardMaterial;
    ['Footwear.whiteLow']: THREE.MeshStandardMaterial;
    Hair: THREE.MeshStandardMaterial;
    ['Top.whiteTop']: THREE.MeshStandardMaterial;
    ['Top.yellowHoodie']: THREE.MeshStandardMaterial;
    Eye: THREE.MeshStandardMaterial;
    Skin: THREE.MeshStandardMaterial;
    Teeth: THREE.MeshStandardMaterial;
  };
};

const CustomAvatar = ({ ...props }) => {
  const { nodes, materials, animations } = useGLTF(
    '/glb/customAvatar.glb'
  ) as GLTFResult;
  const group = useRef<THREE.Group>();
  const filteredByGarment = (garment: string) =>
    Object.fromEntries(
      Object.entries(materials).filter(([key]) => key.includes(garment))
    );

  const xGarment = (option: 'Top' | 'Bottom' | 'Footwear') =>
    Object.keys(filteredByGarment(option))[
      Math.floor(Math.random() * Object.keys(filteredByGarment(option)).length)
    ].replace(option + '.', '');
  const [index, setIndex] = useState<number>(0);
  const [top, setTop] = useState(xGarment('Top'));
  const [bottom, setBottom] = useState(xGarment('Bottom'));
  const [shoes, setShoes] = useState(xGarment('Footwear'));
  const [action, setAction] = useState<string>('Idle');

  const { actions } = useAnimations(animations, group);
  let previousAction: any = usePrevious(action);
  useEffect(() => {
    if (previousAction) {
      actions[previousAction]!.fadeOut(0.2);
      actions[action]!.stop();
    }
    actions[action]!.play();
    actions[action]!.fadeIn(0.2);
  }, [action, actions]);

  useEffect(() => {
    const tick = () => setIndex((i) => i + 1);
    const id = setInterval(tick, 7000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    setTop(xGarment('Top'));
    setBottom(xGarment('Bottom'));
    setShoes(xGarment('Footwear'));
  }, [index]);
  return (
    <group ref={group as Ref<THREE.Group>} {...props} dispose={null}>
      <group>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            onClick={() => setAction('Wave')}
            geometry={nodes.Body.geometry}
            material={materials.Body}
            skeleton={nodes.Body.skeleton}
          />
          <skinnedMesh
            onClick={() => setAction('Wave')}
            geometry={nodes.Hair.geometry}
            material={materials.Hair}
            skeleton={nodes.Hair.skeleton}
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
            name="Head"
            onClick={() => setAction('Wave')}
            geometry={nodes.Head.geometry}
            material={materials.Skin}
            skeleton={nodes.Head.skeleton}
            morphTargetDictionary={nodes.Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Head.morphTargetInfluences}
          />
          <skinnedMesh
            name="Teeth"
            geometry={nodes.Teeth.geometry}
            material={materials.Teeth}
            skeleton={nodes.Teeth.skeleton}
            morphTargetDictionary={nodes.Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Teeth.morphTargetInfluences}
          />
          <skinnedMesh
            onClick={() => setAction('Wave')}
            // @ts-ignore
            geometry={nodes[`Bottom${bottom}`].geometry}
            material={materials[`Bottom.${bottom}` as keyof typeof materials]}
            // @ts-ignore
            skeleton={nodes[`Bottom${bottom}` as keyof typeof nodes].skeleton}
          />

          <skinnedMesh
            onClick={() => setAction('Wave')}
            // @ts-ignore
            geometry={nodes[`Top${top}`].geometry}
            material={materials[`Top.${top}` as keyof typeof materials]}
            // @ts-ignore
            skeleton={nodes[`Top${top}`].skeleton}
          />

          <skinnedMesh
            onClick={() => setAction('Wave')}
            // @ts-ignore
            geometry={nodes[`Footwear${shoes}`].geometry}
            material={materials[`Footwear.${shoes}` as keyof typeof materials]}
            // @ts-ignore
            skeleton={nodes[`Footwear${shoes}`].skeleton}
          />
        </group>
      </group>
    </group>
  );
};

export default CustomAvatar;
