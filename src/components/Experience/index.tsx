import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Link from 'next/link';

const ExperienceContainer = styled.div`
  ${tw`
w-full
max-w-screen-2xl
flex
flex-col
items-center
justify-between
`}
`;
const ExperienceTitle = styled.h2`
  ${tw`
    text-lg
`};
`;
const ExperienceDates = styled.h3`
  ${tw`
    text-sm
`}
`;
const ExperienceDescription = styled.p`
  ${tw`
    text-xs
`}
`;
interface IExperienceObject {
  name: string;
  level?: string;
  role?: string;
  slug?: string;
  projects: string[];
  description: string;
  dates: string;
  testimonials: string[];
}
interface IData {
  data: IExperienceObject;
}
const Experience = ({ data }: IData) => {
  return (
    <ExperienceContainer>
      <ExperienceTitle>
        <Link href={`/experiences/${data?.slug ? data.slug : data.name}`}>
          <a>{data.name}</a>
        </Link>
      </ExperienceTitle>
      <ExperienceDates>{data.dates}</ExperienceDates>
      <ExperienceDescription>{data.description}</ExperienceDescription>
    </ExperienceContainer>
  );
};

export default Experience;
