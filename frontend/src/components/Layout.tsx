import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Props = {
  title?: string;
  children?: React.ReactNode;
  screen?: boolean;
};

const Layout: React.FunctionComponent<Props> = ({ children, ...props }) => {
  const { screen } = props;
  return (
    <>
      {screen ? null : (
        <>
          <Navbar />
          {/* <TempOverlay /> */}
        </>
      )}
      {children}
      {screen ? null : <Footer />}
    </>
  );
};

export default Layout;
