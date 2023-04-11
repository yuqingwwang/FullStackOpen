import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import FavouriteBooks from './components/Recommendation'

import { ALL_BOOKS, ALL_AUTHORS, CURRENT_USER } from './queries'
import { useApolloClient } from '@apollo/client';

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const { loading: meLoading, data: meData } = useQuery(CURRENT_USER)

  if (books.loading || authors.loading){
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendation')}>recommendation</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />

      <button onClick={logout}>logout</button>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} setError={notify}/>

      <Books show={page === 'books'} />

      <FavouriteBooks show={page === 'recommendation'} user={meData.me}/>

      <NewBook show={page === 'add'} setError={notify}/>
    </div>
  )
}

export default App
