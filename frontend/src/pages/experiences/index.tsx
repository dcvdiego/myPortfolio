import React, { useEffect, useRef } from 'react';

import Layout from '../../components/Layout';
import { Container } from '../../styles/global.styles';
import ExperienceApp from '../../components/ExperienceApp';
import { appState } from '../../utils/store';
import { useSnapshot } from 'valtio';

const ExperiencesPage = () => {
  const canvas = useRef() as React.MutableRefObject<HTMLDivElement>;
  const snap = useSnapshot(appState);
  useEffect(() => {
    if (snap.verse && canvas.current) {
      canvas.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [snap.verse]);
  return (
    <Layout title="Experiences">
      <Container ref={canvas}>
        <ExperienceApp />
      </Container>
    </Layout>
  );
};
export default ExperiencesPage;
