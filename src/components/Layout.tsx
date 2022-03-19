import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TempOverlay from './TempOverlay';
type Props = {
  title?: string;
  children?: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => (
  <>
    <Navbar />
    <TempOverlay />
    {children}
    <Footer />
  </>
);

export default Layout;
