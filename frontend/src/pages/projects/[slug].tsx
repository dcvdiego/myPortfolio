import React from 'react';
// import styled from 'twin.macro';

import Layout from '../../components/Layout';
import { Container, Title } from '../../styles/global.styles';
// import Testimonial from '../../components/Testimonial';
// import projects from '../../assets/data/projects.json';
import { useParams } from 'react-router-dom';
import Custom404 from '../404';
import { useQuery } from '@apollo/client';
import PROJECT_QUERY from '../../graphql/Projects/project';

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
  return (
    <Layout title={projects?.name as string} screen>
      {!finalLoading && projects ? (
        <Container>
          {projects.map((project: any) => (
            <>
              <Title>{project.name}</Title>
              {project.description}
            </>
          ))}
          {screen && <p>props work!</p>}
          {/* <TestimonialsContainer>
            <SubHeading>Testimonials from this project</SubHeading>
            {testimonials.map((testimonial) => {
              return testimonial.project.includes(project!.name) ? (
                <Testimonial data={testimonial} />
              ) : null;
            })}
          </TestimonialsContainer> */}
        </Container>
      ) : (
        finalError && <Custom404 />
      )}
    </Layout>
  );
};
export default Client;
