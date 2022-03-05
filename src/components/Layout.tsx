import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
type Props = {
  title?: string;
  children?: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({
  title = 'This is the default title',
  children,
}) => (
  <div>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </head>
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default Layout;
