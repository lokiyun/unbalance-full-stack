import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { IconProvider, DEFAULT_ICON_CONFIGS } from "@icon-park/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@wangeditor/editor/dist/css/style.css";
import "./styles/index.scss";
import "@icon-park/react/styles/index.css";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { AuthProvider } from "./context/authContext";

const IconConfig = { ...DEFAULT_ICON_CONFIGS, prefix: "icon" };

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/sub"
  })
);

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    console.log(definition)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});


// subscriptions

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IconProvider value={IconConfig}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </IconProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
