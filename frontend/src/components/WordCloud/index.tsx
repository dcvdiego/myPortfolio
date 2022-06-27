import React, { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import { TrackballControls } from '@react-three/drei';

import Cloud from './model';

import {
  LazyQueryResult,
  OperationVariables,
  QueryLazyOptions,
} from '@apollo/client';

import { Loader } from '../../styles/global.styles';

interface IWordCloud {
  getTestimonial?: (
    options?: QueryLazyOptions<OperationVariables> | undefined
  ) => Promise<LazyQueryResult<any, OperationVariables>>;
}

const WordCloud: React.FC<IWordCloud> = ({ getTestimonial }) => {
  const linkArray = [
    'hard work',
    'enthusiasm',
    'dedication',
    'commitment',
    'pragmatic',
    'leadership',
    'responsibility',
    'impress',
  ];

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={['#202025', 0, 80]} />
      <group dispose={null}>
        <Suspense fallback={<Loader />}>
          <Cloud
            dist={linkArray.length}
            radius={20}
            data={linkArray}
            getTestimonial={getTestimonial}
            origin="testimonial"
          />
        </Suspense>
        <TrackballControls noZoom />
      </group>
    </Canvas>
  );
};
export default WordCloud;

// thank you Paul Henschel for codesandbox 3D word cloud
