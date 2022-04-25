import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { IconProvider, DEFAULT_ICON_CONFIGS } from "@icon-park/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@wangeditor/editor/dist/css/style.css";
import "./styles/index.scss";
import "@icon-park/react/styles/index.css";
import { getMainDefinition } from "@apollo/client/utilities";
import { client } from "./pages/main";

const IconConfig = { ...DEFAULT_ICON_CONFIGS, prefix: "icon" };


// subscriptions

const root = ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IconProvider value={IconConfig}>
        <App />
      </IconProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
