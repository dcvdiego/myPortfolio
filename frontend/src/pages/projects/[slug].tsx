import React from 'react';
import styled from 'twin.macro';

import Layout from '../../components/Layout';
import { Container, Title, SubHeading } from '../../styles/global.styles';
import Testimonial from '../../components/Testimonial';
import projects from '../../assets/data/projects.json';
import testimonials from '../../assets/data/testimonials.json';
import { useParams } from 'react-router-dom';
import Custom404 from '../404';

const Project = () => {
  let { slug } = useParams();
  // replace with GraphQL query on a NoSQL database?
  const project = projects.find(
    (projectData) => projectData.slug === slug || projectData.name === slug
  );
  const TestimonialsContainer = styled.div``;

  return (
    <Layout title={project?.name as string}>
      {project ? (
        <Container>
          <Title>{project!.name}</Title>
          <TestimonialsContainer>
            <SubHeading>Testimonials from this project</SubHeading>
            {testimonials.map((testimonial) => {
              return testimonial.project.includes(project!.name) ? (
                <Testimonial data={testimonial} />
              ) : null;
            })}
          </TestimonialsContainer>
        </Container>
      ) : (
        <Custom404 />
      )}
    </Layout>
  );
};
export default Project;
