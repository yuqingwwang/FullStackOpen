import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import anecdoteService from './services/anecdotes'
import {setAnecdote} from './reducers/anecdoteReducer'

import App from './App'

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(setAnecdote(anecdotes))
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
