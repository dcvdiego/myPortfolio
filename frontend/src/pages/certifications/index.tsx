import React from 'react';

import Layout from '../../components/Layout';
import { Container, SubHeading, Title } from '../../styles/global.styles';
import tw, { styled } from 'twin.macro';

import CERTIFICATIONS_QUERY from '../../graphql/Certification/certifications';
import Certification from '../../components/Certification';
import { useQuery } from '@apollo/client';
import CERTIFICATIONS_TYPE_QUERY from '../../graphql/Certification/certificationType';
import { TypeName } from './types';

const CategoryContainer = styled.div`
  ${tw`
  flex
  flex-row
  flex-wrap
`}
`;

const CertificationsContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-9/12
  `}
`;
// interface ICertificationsObject {
//   [key: string]: Array<any>;
// }
// const typedCertifications: ICertificationsObject = certifications;

interface ICTypeProps {
  type: TypeName;
}

const CertificationsType: React.FC<ICTypeProps> = (type) => {
  const { loading, error, data } = useQuery(CERTIFICATIONS_TYPE_QUERY, {
    variables: type,
  });
  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  return (
    <CategoryContainer>
      {data.certifications.data[0].attributes.Certification.map(
        (certification: any) => {
          return <Certification data={certification} />;
        }
      )}
    </CategoryContainer>
  );
};

const CertificationsPage = () => {
  const { loading, error, data } = useQuery(CERTIFICATIONS_QUERY);
  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  return (
    <Layout title="Certifications">
      <Container>
        <Title>These are my Certifications and Skills</Title>
        <CertificationsContainer>
          <SubHeading>Technical</SubHeading>
          <CertificationsType type="Technical" />
          <SubHeading>Consulting</SubHeading>
          <CertificationsType type="Consulting" />
        </CertificationsContainer>
      </Container>
    </Layout>
  );
};
export default CertificationsPage;