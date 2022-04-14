import { Container } from '../styles/global.styles';
import React from 'react';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import CREDS_QUERY from '../graphql/Creds/creds';

function CredsPage() {
  const { loading, error, data } = useQuery(CREDS_QUERY);
  let allCreds;
  if (data)
    allCreds = data.creds.data
      .map((origin: any) => origin.attributes.Cred)
      .flat();
  return (
    <Layout title="creds">
      <Container>
        <div>Creds</div>

        {!loading && !error && allCreds.map((cred: any) => <p>{cred.name}</p>)}
      </Container>
    </Layout>
  );
}

export default CredsPage;
