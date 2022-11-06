import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import fetch from "cross-fetch";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launchesPast: offsetLimitPagination(),
      },
    },
  },
});

export const client = new ApolloClient({
  link: new HttpLink({ uri: "https://api.spacex.land/graphql/", fetch }),
  cache,
});
