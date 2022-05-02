import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

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
const ExperienceRole = styled.p`
  ${tw`
    text-xs
    font-bold
`}
`;

const Experience = ({ ...props }) => {
  const { data, setActive } = props;
  return (
    <ExperienceContainer>
      <ExperienceTitle>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => setActive(data.attributes.name)}
        >
          {data.attributes.name}
        </span>
      </ExperienceTitle>
      <ExperienceDates>
        {data.attributes.startDate} -
        {data.attributes.endDate ? data.attributes.endDate : 'Present'}
      </ExperienceDates>
      <ExperienceRole>{data.attributes.role}</ExperienceRole>
    </ExperienceContainer>
  );
};

export default Experience;
