import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement as HTMLDivElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
