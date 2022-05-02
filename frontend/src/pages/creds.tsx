import { Container, SubHeading, Title } from '../styles/global.styles';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import CREDS_QUERY from '../graphql/Creds/creds';
import { Marginer } from '../components/Marginer';

function CredsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const { loading, error, data } = useQuery(CREDS_QUERY);
  let allCreds;
  if (data)
    allCreds = data.creds.data
      .map((origin: any) => origin.attributes.Cred)
      .flat();
  return (
    <Layout title="creds">
      <Container>
        <Title>Creds</Title>

        {!loading &&
          !error &&
          allCreds.map((cred: any) => (
            <>
              <a href={cred?.link} style={{ textDecoration: 'underline' }}>
                <SubHeading style={{ marginBottom: '1rem' }}>
                  {cred.name}
                </SubHeading>
              </a>
              <p>{cred.contribution}</p>
              <Marginer direction="vertical" margin="1em" />
            </>
          ))}
      </Container>
    </Layout>
  );
}

export default CredsPage;
