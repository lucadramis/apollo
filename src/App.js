import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Utente from './components/utente'


const client = new ApolloClient({
  uri: "prisma/graphql-playground"
});

class App extends Component {
  render() {
    return (
     <ApolloProvider client={client}>
     <div className="App">
     <header className='App-header'>
     <img src={logo}
     className="App-logo"
     alt="logo" />
      <p>
        Edit
        <code>src/App.js</code> andsave to reload.
      </p>
      <Utente></Utente>

     </header>
     </div>
     </ApolloProvider>
    );
  }
}

export default App;
