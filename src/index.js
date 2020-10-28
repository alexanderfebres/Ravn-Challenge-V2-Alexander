import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import { offsetLimitPagination } from "@apollo/client/utilities";

const link = new HttpLink({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
