import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
type Props = {
  title?: string;
  children?: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
