import React, { useRef, useState, useMemo, useEffect, FC } from 'react';

import * as THREE from 'three';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { Text, TrackballControls } from '@react-three/drei';
import testimonials from '../../assets/data/testimonials.json';
import Testimonial from '../Testimonial';
import { useTestimonialContext } from '../../pages/testimonials/testimonials.context';

interface IWordProps {
  wordChildren: any;
  position: any;
}

const Word: FC<IWordProps> = ({ wordChildren, ...props }: IWordProps) => {
  const { setActiveWord } = useTestimonialContext();
  const color = new THREE.Color();
  const fontProps = {
    font: '/Inter-Bold.woff',
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e: ThreeEvent<PointerEvent>) => {
    // eslint-disable-next-line no-sequences
    return e.stopPropagation(), setHovered(true);
  };
  const out = () => setHovered(false);
  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  // Tie component to the render-loop
  useFrame(({ camera }) => {
    // Make text face the camera I am confused please help
    ref?.current?.quaternion.copy(camera.quaternion);
    // Animate font color
    ref?.current?.material.color.lerp(
      color.set(hovered ? '#5e2dff' : 'gray'),
      0.1
    );
  });
  return (
    <>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => setActiveWord(wordChildren)}
        {...props}
        {...fontProps}
        // eslint-disable-next-line react/no-children-prop
        children={wordChildren}
      />
    </>
  );
};
interface ICloudProps {
  dist: number;
  radius: number;
  data: Array<String>;
}
const Cloud: Function = ({ dist = 5, radius = 20, data }: ICloudProps) => {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (dist + 1);
    const thetaSpan = (Math.PI * 2) / dist;
    // for (let i = 1; i < count + 1; i++)
    // Taken from https://discourse.threejs.org/t/can-i-place-obects-on-a-sphere-surface-evenly/4773/6
    for (let j = 0; j < data.length; j += 1)
      temp.push([
        new THREE.Vector3().setFromSpherical(
          spherical.set(radius, phiSpan * j + 1, thetaSpan * j + 1)
        ),
        data[j]
      ]);
    return temp;
  }, [dist, radius, data]);
  return words.map(([pos, word], index) => (
    <>
      <Word
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        position={pos}
        wordChildren={word}
      />
    </>
  ));
};
const WordCloud = () => {
  const { activeWord } = useTestimonialContext();
  useEffect(() => {
    console.log(activeWord, 'fromContext');
  }, [activeWord]);
  interface ITestimonialObject {
    from: string;
    title: string;
    content: string;
    // TODO: add project so that it can link to it
  }
  const finalTestimonials = new Map<string, ITestimonialObject[]>();
  const linkArray = [
    'hard work',
    'enthusiasm',
    'dedication',
    'commitment',
    'pragmatic',
    'leadership'
  ];
  testimonials.map((testimonial) => {
    linkArray.forEach((word) => {
      if (testimonial.content.includes(word)) {
        if (finalTestimonials.get(word)) {
          finalTestimonials.get(word)?.push(testimonial);
        } else {
          finalTestimonials.set(word, []);
          finalTestimonials.get(word)?.push(testimonial);
        }
      }
    });
    return finalTestimonials;
  });
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
        <fog attach="fog" args={['#202025', 0, 80]} />
        <Cloud
          dist={linkArray.length}
          radius={20}
          data={linkArray}
          finalTestimonials={finalTestimonials}
        />
        <TrackballControls />
      </Canvas>
      {activeWord !== '' && finalTestimonials ? (
        <Testimonial data={finalTestimonials.get(activeWord)} />
      ) : null}
    </>
  );
};
export default WordCloud;

// thank you Paul Henschel
