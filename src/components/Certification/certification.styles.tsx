import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

const StyledCertification = styled.div`
  box-sizing: border-box;

  * {
    box-sizing: inherit;
  }

  *:before,
  *:after {
    box-sizing: inherit;
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
  ${tw`
    p-12
  `}
`;

export const CertificationContainer = styled(motion.button)`
  --button-star-greyscale: 0%;
  --button-star-contrast: 0%;
  --button-star-hue: 170deg;
  border: none;
  border-radius: 26px;
  outline: none;
  box-shadow: inset 0 0 0 1px #35373f, 0px 1px 3px rgba(52, 54, 63, 0.1),
    0px 4px 10px rgba(52, 54, 63, 0.15);
  ${tw`
  appearance-none 
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

export const StyledIcon = styled(motion.div)`
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
