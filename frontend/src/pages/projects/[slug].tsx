import React from 'react';
// import styled from 'twin.macro';

import Layout from '../../components/Layout';
import { Container, Title } from '../../styles/global.styles';
// import Testimonial from '../../components/Testimonial';
// import projects from '../../assets/data/projects.json';
import { useParams } from 'react-router-dom';
import Custom404 from '../404';
import { useQuery } from '@apollo/client';
import PROJECT_QUERY from '../../graphql/Project/project';

const Client = ({ ...props }) => {
  const { screen, componentData } = props;
  let { slug } = useParams();
  if (screen) {
    var data = componentData;
  } else {
    var { loading, error, data } = useQuery(PROJECT_QUERY, {
      variables: { slug },
    });
  }
  const projects = data?.dataComponents.data[0].attributes.Project;
  return (
    <Layout title={projects?.name as string} screen={screen}>
      {!loading && projects ? (
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
        error && <Custom404 />
      )}
    </Layout>
  );
};
export default Client;
