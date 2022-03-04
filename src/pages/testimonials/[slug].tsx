import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Container, Title } from '@/styles/global.styles';
import testimonials from '../../assets/data/testimonials.json';

// do I even need a slug for this?
const Testimonial: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const testimonial = testimonials.find(
    (testimonial) => testimonial.from === slug
  );
  return (
    <Layout title={slug as string}>
      <Container>
        <Title>{slug}</Title>
      </Container>
    </Layout>
  );
};
export default Testimonial;
