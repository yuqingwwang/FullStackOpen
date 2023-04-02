import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const query = gql`
  query {
    allBooks  {
      title,
      published,
      author
      id
      genres
    }
  }
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
// )
