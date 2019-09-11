import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Container } from 'react-bootstrap';


// components
import PlayerList from './components/PlayerList';

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
            <div id="main">
              <Container>
                <h1>Head Info Test Techninal Test</h1>
                <PlayerList />
              </Container>
            </div>
        </ApolloProvider>
  );
}

export default App;
