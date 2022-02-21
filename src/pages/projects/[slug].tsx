import React from 'react';
import { styled } from 'twin.macro';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Container, Title, SubHeading } from '@/styles/global.styles';
import Testimonial from '@/components/Testimonial';
import projects from '../../assets/data/projects.json';
import testimonials from '../../assets/data/testimonials.json';

const Project: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  // replace with GraphQL query on a NoSQL database?
  const project = projects.find(
    (projectData) => projectData.slug === slug || projectData.name === slug
  );
  const TestimonialsContainer = styled.div``;

  return (
    <Layout title={project?.name as string}>
      <Container>
        <Title>{project?.name}</Title>
        <TestimonialsContainer>
          <SubHeading>Testimonials from this project</SubHeading>
          {/* eslint-disable-next-line array-callback-return */}
          {testimonials.map((testimonial) => {
            return testimonial.project.includes(project.name) ? (
              <Testimonial data={testimonial} />
            ) : null;
          })}
        </TestimonialsContainer>
      </Container>
    </Layout>
  );
};
export default Project;
