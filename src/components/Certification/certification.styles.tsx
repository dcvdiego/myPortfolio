import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';
import Icon from './icon';

const StyledCertification = styled.div`
  box-sizing: border-box;

  * {
    box-sizing: inherit;
  }

  *:before,
  *:after {
    box-sizing: inherit;
  }
  button {
    --button-star-greyscale: 0%;
    --button-star-contrast: 0%;
    --button-star-hue: 170deg;

    appearance: none;
    border: none;
    cursor: pointer;
    background-color: #1f2024;
    color: #fff;
    border-radius: 26px;
    outline: none;
    margin: 0;
    padding: 0;
    padding-left: 50px;
    font-size: 28px;
    font-weight: 600;
    line-height: 40px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 0 1px #35373f, 0px 1px 3px rgba(52, 54, 63, 0.1),
      0px 4px 10px rgba(52, 54, 63, 0.15);
  }

  .icon {
    display: block;
    width: 600px;
    height: 300px;
    z-index: 1;
    pointer-events: none;
    transform-origin: 50% 52%;
    filter: contrast(var(--button-cert-contrast));
    opacity: 1;
    position: absolute;
    top: -110px;
    left: -250px;
  }

  .icon canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .label {
    width: 180px;
    padding: 20px 0;
    transform: translateZ(0);
  }

  .default {
    display: block;
  }
  .description {
    h3 {
      font-size: medium;
    }
    p {
      font-size: small;
    }
  }
  .cta {
    padding: 20px 0;
    width: 88px;
    position: relative;
    transform: translateZ(0);
  }

  .cta:before {
    content: '';
    position: absolute;
    left: 0;
    top: 1px;
    bottom: 1px;
    width: 1px;
    background-color: #35373f;
  }

  .ctaText {
    color: #b1b3bd;
    opacity: 1;
    display: block;
  }

  .close {
    color: #fbaaaa;
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    display: block;
  }

  .add {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    opacity: 0;
    transform: translateY(38px);
    pointer-events: none;
    color: #d0d0db;
    display: block;
  }
`;

export const CertificationContainer = styled(motion.div)`
  --button-star-greyscale: 0%;
  --button-star-contrast: 0%;
  --button-star-hue: 170deg;
  border: none;
  border-radius: 26px;
  outline: none;
  box-shadow: inset 0 0 0 1px #35373f, 0px 1px 3px rgba(52, 54, 63, 0.1),
    0px 4px 10px rgba(52, 54, 63, 0.15);
  ${tw`appearance-none 
  cursor-pointer 
  bg-gray-900 
  text-white 
  m-0 
  p-0 
  pl-12 
  text-3xl 
  font-semibold 
  leading-10
   relative 
   text-center 
   flex 
   items-center`}
`;

export const StyledIcon = styled(Icon)`
  width: 600px;
  height: 300px;
  z-index: 1;
  transform-origin: 50% 52%;
  filter: contrast(var(--button-cert-contrast));
  top: -110px;
  left: -250px;
  ${tw`
    block 
    pointer-events-none 
    opacity-100 
    absolute
  `}
`;

export const StyledCanvas = styled(Canvas)`
  ${tw`
    absolute 
    w-full 
    h-full
  `}
`;

export const Label = styled.div`
  ${tw`
  w-48
  `}
  padding: 20px 0;
  transform: translateZ(0);
`;

export const Default = styled(motion.span)`
  ${tw`
    block
  `}
`;

export const DescriptionContainer = styled(motion.span)``;

export const DescriptionTitle = styled.h3`
  ${tw`
  text-sm
  `}
`;

export const DescriptionContent = styled.p`
  ${tw`
  text-xs
  `}
`;

export const CTAContainer = styled.div`
  ${tw`
    w-20 
    relative
  `}
  padding: 20px 0;
  transform: translateZ(0);
  &:before {
    ${tw`
      absolute left-0 w-px bg-gray-800
    `}
    content: '';
    top: 1px;
    bottom: 1px;
  }
`;

export const CTAText = styled(motion.span)`
  ${tw`
  text-gray-500 
  opacity-100 
  block
`}
`;

export const CTAClose = styled(motion.span)`
  top: 20px;
  ${tw`
  text-red-300 absolute left-0 right-0 block
`}
`;

// do we need an add? wot

export default StyledCertification;
