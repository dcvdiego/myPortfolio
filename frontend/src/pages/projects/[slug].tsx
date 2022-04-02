import React from 'react';
// import styled from 'twin.macro';

import Layout from '../../components/Layout';
import { Container, Title } from '../../styles/global.styles';
// import Testimonial from '../../components/Testimonial';
import projects from '../../assets/data/projects.json';
import { useParams } from 'react-router-dom';
import Custom404 from '../404';

const Project = ({ ...props }) => {
  const { screen, title } = props;
  let { slug } = useParams();
  const finder = title ? title : slug;
  const project = projects.find((projectData) => {
    projectData.slug === finder || projectData.name === finder;
  });

  return (
    <Layout title={project?.name as string} screen={screen}>
      {project ? (
        <Container>
          <Title>{project!.name}</Title>
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
        <Custom404 />
      )}
    </Layout>
  );
};
export default Project;
