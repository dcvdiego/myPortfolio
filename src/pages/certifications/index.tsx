import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { Container, Title, SubHeading } from '@/styles/global.styles';
import tw, { styled } from 'twin.macro';
import Certification, {
  ICertificationObject
} from '@/components/Certification';
import certifications from '../../assets/data/certifications.json';

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
interface ICertificationsObject {
  [key: string]: Array<any>;
}
const typedCertifications: ICertificationsObject = certifications;
const CertificationsPage: NextPage = () => {
  return (
    <Layout title="Certifications">
      <Container>
        <Title>These are my Certifications and Skills</Title>
        <CertificationsContainer>
          {Object.keys(certifications).map((category) => {
            return (
              <>
                <SubHeading>{category}</SubHeading>
                <CategoryContainer>
                  {typedCertifications[category].map(
                    (certification: ICertificationObject) => {
                      return <Certification data={certification} />;
                    }
                  )}
                </CategoryContainer>
              </>
            );
          })}
        </CertificationsContainer>
      </Container>
    </Layout>
  );
};
export default CertificationsPage;
