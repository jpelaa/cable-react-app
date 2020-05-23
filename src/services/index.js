import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({
  uri: 'https://cable-dashboard.herokuapp.com/v1/graphql',
   headers: {
        "x-hasura-admin-secret": `cable`
      },
    cache: new InMemoryCache(),
});

