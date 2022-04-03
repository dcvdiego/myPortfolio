import React from 'react';
import ABOUT_QUERY from '../graphql/About/about';
import { useQuery } from '@apollo/client';
import Layout from '../components/Layout';
import { Container } from '../styles/global.styles';

function AboutPage({ ...props }) {
  const { screen, componentData } = props;
  if (screen) {
    var data = componentData;
  } else {
    var { loading, error, data } = useQuery(ABOUT_QUERY);
  }
  const aboutData = data?.about?.data?.attributes;
  return (
    <Layout title="about" screen={screen}>
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>ERROR</p>
        ) : (
          <>
            <h1>{aboutData.Title}</h1>
            <div>{aboutData.Content}</div>
          </>
        )}
      </Container>
    </Layout>
  );
}

export default AboutPage;
