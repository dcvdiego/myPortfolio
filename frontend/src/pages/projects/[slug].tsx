import React from 'react';
// import styled from 'twin.macro';

import Layout from '../../components/Layout';
import { Button, Container, Title } from '../../styles/global.styles';
// import Testimonial from '../../components/Testimonial';
// import projects from '../../assets/data/projects.json';
import { Link, useParams } from 'react-router-dom';
import Custom404 from '../404';
import { useQuery } from '@apollo/client';
import PROJECT_QUERY from '../../graphql/Projects/project';
import tw, { styled } from 'twin.macro';
import { formatMyDate, isImage } from '../../utils/generalHelpers';
import ReadMore from '../../components/ReadMore';

const Client = ({ ...props }) => {
  const { screen, componentData } = props;
  let { slug } = useParams();
  let finalData, finalLoading, finalError;
  if (screen) {
    finalData = componentData;
  } else {
    const { loading, error, data } = useQuery(PROJECT_QUERY, {
      variables: { slug },
    });
    finalLoading = loading;
    finalError = error;
    finalData = data;
  }
  const projects = finalData?.dataComponents.data[0].attributes.Project;
  const ProjectContainer = styled.div<{ lightMode?: boolean }>`
    color: ${(props) => (props.lightMode ? 'black' : 'white')} !important;
    ${tw`
      flex
      flex-row
      h-80
      w-1/3
    `};
  `;
  const ProjectContainerScreen = styled.div<{ lightMode?: boolean }>`
    color: ${(props) => (props.lightMode ? 'black' : 'white')} !important;
    ${tw`
    flex
    flex-row
    h-80
    pt-0.5
    pb-0.5
    ml-2
    mr-2
  `};
  `;
  const LeftContainer = styled.div<{ lightMode?: boolean }>`
    border-right: 2px solid ${(props) => (props.lightMode ? 'black' : 'white')};
    ${tw`
    flex
    flex-wrap
    mr-4
    `}
  `;
  const RightContainer = styled.div`
    ${tw`flex-grow`}
  `;
  const LanguageContainer = styled.div`
    ${tw`
    flex
    flex-row
    flex-wrap
    `}
  `;
  const IconWrapper = styled.div`
    height: 3.5rem;
    width: auto;
  `;
  const LanguageIcon = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
  `;

  return (
    <Layout screen={screen}>
      {!finalLoading && projects ? (
        // if screen then lightMode, else dark mode
        screen ? (
          <Container lightMode>
            {projects.map((project: any) => {
              return (
                <ProjectContainerScreen lightMode>
                  <LeftContainer lightMode>
                    <Title noMargin>{project.name}</Title>
                    <ReadMore>{project.description}</ReadMore>
                    <br />
                  </LeftContainer>
                  <RightContainer>
                    {/* pic or video */}
                    {isImage(project.preview.data.attributes.url) && (
                      <img
                        src={
                          import.meta.env.VITE_BACKEND_URL +
                          '/' +
                          project.preview.data.attributes.url
                        }
                      />
                    )}
                    <LanguageContainer>
                      {project.infrastructure.map((language: string) => {
                        return (
                          <IconWrapper>
                            <LanguageIcon
                              src={`/img/${language}_icon.png`}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = '/img/Typescript_icon.png';
                              }}
                            />
                          </IconWrapper>
                        );
                      })}
                    </LanguageContainer>
                    <p>
                      {formatMyDate(project.startDate)}-
                      {formatMyDate(project.endDate)}
                    </p>
                  </RightContainer>
                </ProjectContainerScreen>
              );
            })}
          </Container>
        ) : (
          <Container>
            {projects.map((project: any) => {
              return (
                <ProjectContainer>
                  <LeftContainer>
                    <Title
                      noMargin
                      style={{ height: 'fit-content', alignItems: 'center' }}
                    >
                      {project.name}
                    </Title>
                    <ReadMore style={{ alignItems: 'center' }}>
                      {project.description}
                    </ReadMore>
                    <br />
                  </LeftContainer>
                  <RightContainer>
                    {/* pic or video */}
                    {isImage(project.preview.data.attributes.url) && (
                      <img
                        src={
                          import.meta.env.VITE_BACKEND_URL +
                          project.preview.data.attributes.url
                        }
                      />
                    )}
                    <LanguageContainer>
                      {project.infrastructure.map((language: string) => {
                        return (
                          <IconWrapper>
                            <LanguageIcon
                              src={`/img/${language}_icon.png`}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = '/img/HTML_icon.png';
                              }}
                            />
                          </IconWrapper>
                        );
                      })}
                    </LanguageContainer>
                    <p>
                      {formatMyDate(project.startDate)}-
                      {formatMyDate(project.endDate)}
                    </p>
                  </RightContainer>
                </ProjectContainer>
              );
            })}
            <Button>
              <Link to="/projects">Go back to projects</Link>
            </Button>
          </Container>
        )
      ) : (
        finalError && <Custom404 />
      )}
    </Layout>
  );
};
export default Client;
