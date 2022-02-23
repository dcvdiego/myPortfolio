import React, { useState, Suspense, useEffect } from 'react';
import { motion, Variants, Transition } from 'framer-motion';
import Icon from './icon';
import StyledCertification from './certification.styles';

// Ported from https://codepen.io/popmotion/pen/oNGxjpr?editors=1111 and Framer Motion 3D example
export default function Certification() {
  const [isHover, setIsHover] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <StyledCertification>
      <motion.button
        initial={false}
        animate={[isLiked ? 'liked' : 'unliked', isHover ? 'hover' : 'rest']}
        whileTap="press"
        variants={buttonVariants}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        onClick={() => setIsLiked(!isLiked)}
      >
        <motion.div
          className="icon"
          variants={{
            liked: { opacity: 0, transition: iconFadeTransition },
            hover: isLiked
              ? { opacity: 0, transition: iconFadeTransition }
              : { opacity: 1 }
          }}
        >
          <Suspense fallback={null}>
            <Icon isHover={isHover} isLiked={isLiked} />
          </Suspense>
        </motion.div>
        <div className="label">
          <motion.span variants={labelTextVariants} className="default">
            AWS Certified Cloud Practitioner
            <motion.span variants={successTextVariants} className="success">
              red
            </motion.span>
          </motion.span>
        </div>
        <div className="number">
          <motion.span variants={currentCountVariants} className="current">
            See More
          </motion.span>
          <motion.span variants={newCountVariants} className="new">
            Close
          </motion.span>
        </div>
      </motion.button>
    </StyledCertification>
  );
}

const iconFadeTransition: Transition = { duration: 0.2, delay: 0.5 };

const buttonVariants: Variants = {
  rest: {
    '--button-star-greyscale': '100%',
    '--button-star-contrast': '0%',
    transition: { duration: 0.7 }
  },
  hover: {
    '--button-star-greyscale': '0%',
    '--button-star-contrast': '100%',
    scale: 1.05
  },
  press: { scale: 0.95 }
};

const labelTextVariants: Variants = {
  unliked: { x: 24 },
  liked: { x: -20 }
};

const successTextVariants: Variants = {
  unliked: { opacity: 0 },
  liked: { opacity: 1 }
};

const likedTransition: Transition = {
  duration: 0.25,
  delay: 0.5
};

const currentCountVariants: Variants = {
  unliked: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  liked: { opacity: 0, y: -40, transition: likedTransition }
};

const newCountVariants: Variants = {
  unliked: { opacity: 0, y: 40, transition: { duration: 0.25 } },
  liked: { opacity: 1, y: 0, transition: likedTransition }
};
