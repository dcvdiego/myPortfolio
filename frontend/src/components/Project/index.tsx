import React from 'react';

import { Link } from 'react-router-dom';
import {
  ProjectClient,
  ProjectContainer,
  ProjectDates,
  ProjectDescription,
  ProjectTitle,
} from './project.styles';

interface IProjectObject {
  name: string;
  clientName?: number;
  slug?: string;
  infrastructure: string[];
  projectSize: number;
  clientSize: number;
  description: string;
  startDate: string;
  endDate: string;
  link?: string;
  repo: string;
}
interface IData {
  data: IProjectObject;
  screen?: boolean;
}
const Project = ({ data, screen }: IData) => {
  return (
    <ProjectContainer>
      <ProjectTitle>
        {screen ? (
          data.name
        ) : (
          <Link to={`/projects/${data?.slug ? data.slug : data.name}`}>
            <a>{data.name}</a>
          </Link>
        )}
      </ProjectTitle>
      <ProjectClient>{data.clientName}</ProjectClient>
      <ProjectDates>
        {data.startDate} - {data.endDate ? data.endDate : 'Present'}
      </ProjectDates>
      <ProjectDescription>{data.description}</ProjectDescription>
    </ProjectContainer>
  );
};

export default Project;
