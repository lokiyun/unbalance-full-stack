import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import {IconProvider, DEFAULT_ICON_CONFIGS} from '@icon-park/react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';
import '@icon-park/react/styles/index.css';

const IconConfig = {...DEFAULT_ICON_CONFIGS, prefix: 'icon'}

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

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
