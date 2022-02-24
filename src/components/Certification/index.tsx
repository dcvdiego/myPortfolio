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
  StyledIcon
} from './certification.styles';

interface IProjectObject {
  threedid: string;
  name: string;
  awardingBody: string;
  description: string;
  date: string;
}
interface IData {
  data: IProjectObject;
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
          isHover ? 'hover' : 'rest'
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
              : { opacity: 1 }
          }}
        >
          <Suspense fallback={null}>
            <Icon
              isHover={isHover}
              isSelected={isSelected}
              url={data.threedid}
            />
          </Suspense>
        </StyledIcon>
        <Label>
          <Default variants={labelTextVariants}>
            <motion.span variants={labelTitleVariants}>
              {data.awardingBody}
            </motion.span>
            <DescriptionContainer
              variants={descriptionTextVariants}
              className="description"
            >
              <DescriptionTitle>Description</DescriptionTitle>
              <DescriptionContent>{data.description}.</DescriptionContent>
            </DescriptionContainer>
          </Default>
        </Label>
        <CTAContainer>
          <CTAText variants={ctaTextVariants} className="ctaText">
            See More
          </CTAText>
          <CTAClose variants={closeVariants} className="close">
            Close
          </CTAClose>
        </CTAContainer>
      </CertificationContainer>
    </StyledCertification>
  );
}

const iconFadeTransition: Transition = { duration: 0.2, delay: 0.5 };

const buttonVariants: Variants = {
  rest: {
    '--button-cert-contrast': '100%',
    transition: { duration: 0.7 }
  },
  hover: {
    '--button-cert-contrast': '100%',
    scale: 1.05
  },
  press: { scale: 0.95 }
};

const labelTextVariants: Variants = {
  unselected: { x: 30 },
  selected: { x: -50 }
};

const labelTitleVariants: Variants = {
  unselected: { opacity: 1 },
  selected: { opacity: 0 }
};

const descriptionTextVariants: Variants = {
  unselected: { opacity: 0 },
  selected: { opacity: 1 }
};

const selectedTransition: Transition = {
  duration: 0.25,
  delay: 0.5
};

const ctaTextVariants: Variants = {
  unselected: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  selected: { opacity: 0, y: -40, transition: selectedTransition }
};

const closeVariants: Variants = {
  unselected: { opacity: 0, y: 40, transition: { duration: 0.25 } },
  selected: { opacity: 1, y: 0, transition: selectedTransition }
};
