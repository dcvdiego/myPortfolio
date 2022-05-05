import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSnapshot } from 'valtio';
import { appState } from '../utils/store';

type Props = {
  title?: string;
  children?: React.ReactNode;
  screen?: boolean;
};

const Layout: React.FunctionComponent<Props> = ({ children, ...props }) => {
  const { screen } = props;
  const snap = useSnapshot(appState);
  return (
    <>
      {screen || snap.verse ? null : (
        <>
          <Navbar />
          {/* <TempOverlay /> */}
        </>
      )}
      {children}
      {screen || snap.verse ? null : <Footer />}
    </>
  );
};

export default Layout;
