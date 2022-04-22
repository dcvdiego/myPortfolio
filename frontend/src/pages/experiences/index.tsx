import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, SubHeading } from '../../styles/global.styles';
import ExperienceApp from '../../components/ExperienceApp';
import { appState, browserState } from '../../utils/store';
import { useSnapshot } from 'valtio';
import Experience from '../../components/Experience';
import { useQuery } from '@apollo/client';
import EXPERIENCES_QUERY from '../../graphql/Experience/experiences';
import { Marginer } from '../../components/Marginer';
import Project from '../../components/Project';
import Testimonial from '../../components/Testimonial';

const ExperiencesPage = () => {
  const canvas = useRef() as React.MutableRefObject<HTMLDivElement>;
  const snap = useSnapshot(appState);
  const bSnap = useSnapshot(browserState);
  const triggerScroll = () => {
    if (snap.verse && canvas.current) {
      canvas.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    triggerScroll();
  }, [snap.verse]);
  const { data, loading, error } = useQuery(EXPERIENCES_QUERY);
  const [activeX, setActiveX] = useState<string>();
  const [activeXData, setActiveXData] = useState<any>();
  useEffect(() => {
    if (!activeX) return;
    setActiveXData(
      data.experiences.data.filter(
        (experience: any) => experience.attributes.name === activeX
      )[0].attributes
    );
  }, [activeX]);
  return (
    <Layout title="Experiences">
      <Container ref={canvas} onClick={triggerScroll}>
        {bSnap.readerMode && !loading && !error ? (
          <>
            {data.experiences.data.map((experience: any) => (
              <Experience data={experience} setActive={setActiveX} />
            ))}
            {activeX && activeXData && (
              <>
                <Marginer direction="vertical" margin="2rem" />
                <p>{activeXData.description}</p>
                <SubHeading>Projects from this experience:</SubHeading>
                {/* we need to check whetehr stuff exists, even tho it should always anyways I guess? */}
                {activeXData.data_components.data[0].attributes.Project &&
                  activeXData.data_components.data[0].attributes.Project.map(
                    (project: any) => {
                      return <Project data={project} />;
                    }
                  )}
                <Marginer direction="vertical" margin="2rem" />
                <SubHeading>Testimonials from this experience:</SubHeading>
                {activeXData.data_components.data[0].attributes.Testimonial &&
                  activeXData.data_components.data[0].attributes.Testimonial.map(
                    (testimonial: any) => {
                      return <Testimonial data={testimonial} />;
                    }
                  )}
                {/* add pics and all? idk man */}
              </>
            )}
          </>
        ) : (
          <ExperienceApp />
        )}
      </Container>
    </Layout>
  );
};
export default ExperiencesPage;
