import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
});
const client = new ApolloClient({
  link,
  cache,
});

export default client;
