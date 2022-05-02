import React, { useEffect } from 'react';
import ABOUT_QUERY from '../graphql/About/about';
import { useQuery } from '@apollo/client';
import Layout from '../components/Layout';
import { Container } from '../styles/global.styles';
import { styled } from 'twin.macro';
import ReactMarkdown from 'react-markdown';

function AboutPage({ ...props }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const { screen, componentData } = props;
  let finalData, finalLoading, finalError;
  if (screen) {
    finalData = componentData;
  } else {
    const { loading, error, data } = useQuery(ABOUT_QUERY);
    finalLoading = loading;
    finalError = error;
    finalData = data;
  }
  const aboutData = finalData?.about?.data?.attributes;

  const AboutContainer = styled.div`
    margin: 0 auto;
    width: 80%;
    overflow: initial;
  `;
  return (
    <Layout title="about" screen={screen}>
      <Container>
        {finalLoading ? (
          <p>Loading...</p>
        ) : finalError ? (
          <p>ERROR</p>
        ) : (
          <AboutContainer>
            <h1>{aboutData.Title}</h1>
            <ReactMarkdown>{aboutData.Content}</ReactMarkdown>
          </AboutContainer>
        )}
      </Container>
    </Layout>
  );
}

export default AboutPage;
