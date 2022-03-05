import React, { useState, Suspense, useRef } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, TrackballControls } from '@react-three/drei';

import Cloud from './model';
import testimonials from '../../assets/data/testimonials.json';
import Testimonial from '../Testimonial';

const WordCloud = () => {
  const [activeWord, setActiveWord] = useState<string>('');
  interface ITestimonialObject {
    from: string;
    project: string;
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
    'leadership',
  ];
  testimonials.map((testimonial) => {
    linkArray.forEach((word) => {
      if (testimonial.content.includes(word)) {
        if (finalTestimonials.get(word)) {
          finalTestimonials.get(word)!.push(testimonial);
        } else {
          finalTestimonials.set(word, []);
          finalTestimonials.get(word)!.push(testimonial);
        }
      }
    });
    return finalTestimonials;
  });
  return (
    <>
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
          {/* <OrbitControls enableZoom={false} /> */}
          <fog attach="fog" args={['#202025', 0, 80]} />
          <group dispose={null}>
            <Cloud
              dist={linkArray.length}
              radius={20}
              data={linkArray}
              finalTestimonials={finalTestimonials}
              onTextClick={setActiveWord}
            />
            {/* <OrbitControls enableZoom={false} /> */}
            <TrackballControls />
          </group>
        </Canvas>
      </Suspense>
      {activeWord !== ''
        ? finalTestimonials.get(activeWord)!.map((testimonial) => {
            return <Testimonial data={testimonial} word={activeWord} />;
          })
        : null}
    </>
  );
};
export default WordCloud;

// thank you Paul Henschel for codesandbox 3D word cloud
