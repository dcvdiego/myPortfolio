import React, { useState, Suspense } from 'react';
import { motion, Variants, Transition } from 'framer-motion';
import Icon from './icon';
import StyledCertification, {
  CertificationContainer,
  CTAClose,
  CTAContainer,
  CTAText,
  Default,
  DescriptionContainer,
  DescriptionContent,
  DescriptionTitle,
  Label,
  StyledIcon,
} from './certification.styles';

export interface ICertificationObject {
  threedid: string;
  name: string;
  awardingBody: string;
  description: string;
  date: string;
  shape: 'Circle' | 'Plane' | 'Hexagon';
}
interface IData {
  data: ICertificationObject;
}

// Ported from https://codepen.io/popmotion/pen/oNGxjpr?editors=1111 and Framer Motion 3D example
export default function Certification({ data }: IData) {
  const [isHover, setIsHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <StyledCertification>
      <CertificationContainer
        initial={false}
        animate={[
          isSelected ? 'selected' : 'unselected',
          isHover ? 'hover' : 'rest',
        ]}
        whileTap="press"
        variants={buttonVariants}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        onClick={() => setIsSelected(!isSelected)}
      >
        <StyledIcon
          className="icon"
          variants={{
            selected: { opacity: 0, transition: iconFadeTransition },
            hover: isSelected
              ? { opacity: 0, transition: iconFadeTransition }
              : { opacity: 1 },
          }}
        >
          <Suspense fallback={null}>
            <Icon
              isHover={isHover}
              isSelected={isSelected}
              url={data.threedid}
              shape={data.shape}
            />
          </Suspense>
        </StyledIcon>
        <Label>
          <Default
            variants={
              isSelected
                ? labelTextVariantsSelected
                : labelTextVariantsUnselected
            }
          >
            <motion.span variants={labelTitleVariants}>
              {data.awardingBody}
            </motion.span>
            <DescriptionContainer variants={descriptionTextVariants}>
              <DescriptionTitle variants={descriptionTextVariants}>
                Description
              </DescriptionTitle>
              <DescriptionContent variants={descriptionTextVariants}>
                {data.description}.
              </DescriptionContent>
            </DescriptionContainer>
          </Default>
        </Label>
        <CTAContainer>
          <CTAText variants={ctaTextVariants}>See More</CTAText>
          <CTAClose variants={closeVariants}>Close</CTAClose>
        </CTAContainer>
      </CertificationContainer>
    </StyledCertification>
  );
}

const iconFadeTransition: Transition = { duration: 0.2, delay: 0.5 };

const buttonVariants: Variants = {
  rest: {
    // @ts-ignore
    '--button-cert-contrast': '100%',
    transition: { duration: 0.7 },
  },
  hover: {
    // @ts-ignore
    '--button-cert-contrast': '100%',
    scale: 1.05,
  },
  press: { scale: 0.95 },
};

const labelTextVariantsUnselected: Variants = {
  unselected: { x: 20 },
  hover: { x: 30 },
  selected: { x: -50 },
};
const labelTextVariantsSelected: Variants = {
  unselected: { x: 20 },
  selected: { x: -50 },
};

const labelTitleVariants: Variants = {
  unselected: { opacity: 1 },
  selected: { opacity: 0 },
};

const descriptionTextVariants: Variants = {
  unselected: { opacity: 0, y: 0 },
  selected: { opacity: 1, y: -20 },
};

const selectedTransition: Transition = {
  duration: 0.25,
  delay: 0.5,
};

const ctaTextVariants: Variants = {
  unselected: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  selected: { opacity: 0, y: -40, transition: selectedTransition },
};

const closeVariants: Variants = {
  unselected: { opacity: 0, y: 40, transition: { duration: 0.25 } },
  selected: { opacity: 1, y: 20, transition: selectedTransition },
};
