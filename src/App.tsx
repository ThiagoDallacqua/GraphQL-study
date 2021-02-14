import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import logo from './logo.svg';
import RepoTable from './pages/RepoTable';

import './App.css';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GH_KEY}`,
    // use .env file to set this up. you don't have to install any additional modules for that.
    // Read more: https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <RepoTable />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
