import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

const ProjectContainer = styled.div`
  ${tw`
w-full
max-w-screen-2xl
flex
flex-col
items-center
justify-between
`}
`;
const ProjectTitle = styled.h2`
  ${tw`
    text-lg
`};
`;
const ProjectDates = styled.h3`
  ${tw`
    text-sm
`}
`;
const ProjectDescription = styled.p`
  ${tw`
    text-xs
`}
`;
interface IProjectObject {
  name: string;
  slug?: string;
  infrastructure: string[];
  client: number;
  project: number;
  description: string;
  dates: string;
  link?: string;
  repository: string;
}
interface IData {
  data: IProjectObject;
}
const Project = ({ data }: IData) => {
  return (
    <ProjectContainer>
      <ProjectTitle>
        <Link to={`/projects/${data?.slug ? data.slug : data.name}`}>
          <a>{data.name}</a>
        </Link>
      </ProjectTitle>
      <ProjectDates>{data.dates}</ProjectDates>
      <ProjectDescription>{data.description}</ProjectDescription>
    </ProjectContainer>
  );
};

export default Project;
