import React from 'react';
import ABOUT_QUERY from '../graphql/About/about';
import { useQuery } from '@apollo/client';
import Layout from '../components/Layout';
import { Container } from '../styles/global.styles';
import { styled } from 'twin.macro';
import ReactMarkdown from 'react-markdown';

function AboutPage({ ...props }) {
  const { screen, componentData } = props;
  if (screen) {
    var data = componentData;
  } else {
    var { loading, error, data } = useQuery(ABOUT_QUERY);
  }
  const aboutData = data?.about?.data?.attributes;

  const AboutContainer = styled.div`
    margin: 0 auto;
    width: 80%;
    overflow: initial;
  `;
  return (
    <Layout title="about" screen={screen}>
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
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
