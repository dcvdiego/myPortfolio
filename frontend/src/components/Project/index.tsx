import React from 'react';

import { Link } from 'react-router-dom';
import {
  ProjectContainer,
  ProjectDates,
  ProjectDescription,
  ProjectTitle,
} from './project.styles';

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
