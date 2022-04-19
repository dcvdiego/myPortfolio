import React from 'react';
import { motion } from 'framer-motion';

// Word wrapper
const Wrapper: React.FC = (props) => {
  // We'll do this to prevent wrapping of words using CSS
  return <span style={{ whiteSpace: 'nowrap' }}>{props.children}</span>;
};

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
interface IAnimatedCharacterProps {
  text: string;
}
const AnimatedCharacters: React.FC<IAnimatedCharacterProps> = (props) => {
  const { text } = props;
  // Framer Motion variant object, for controlling animation
  const item = {
    hidden: {
      y: '200%',
      color: '#810092',
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      color: '#f7e0ff',
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  //  Split each word of text into an array
  const splitWords = text.split(' ');

  // Create storage array
  let words: string[][] = [];

  // Push each word into words array
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(''));
  }

  // ("\u00A0") = space at end of each word
  words.map((word) => {
    return word.push('\u00A0');
  });
  return (
    <>
      {words.map((_word, index) => {
        return (
          // Wrap each word in the Wrapper component
          <Wrapper key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: 'hidden',
                    display: 'inline-block',
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: 'inline-block' }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
    </>
  );
};

export default AnimatedCharacters;

// nathan searles nathansearles.com
