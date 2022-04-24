import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import * as ws from 'ws';
import {IconProvider, DEFAULT_ICON_CONFIGS} from '@icon-park/react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@wangeditor/editor/dist/css/style.css'
import './styles/index.scss';
import '@icon-park/react/styles/index.css';

const IconConfig = {...DEFAULT_ICON_CONFIGS, prefix: 'icon'}

const wsClient = createClient({
  url: "ws://localhost:4000/graphql",
  webSocketImpl: ws,
  retryAttempts: 0,
});

const client = new ApolloClient({
  link: new GraphQLWsLink(wsClient),
  cache: new InMemoryCache(),
});
// subscriptions


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IconProvider value={IconConfig}>
        <App />
      </IconProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
