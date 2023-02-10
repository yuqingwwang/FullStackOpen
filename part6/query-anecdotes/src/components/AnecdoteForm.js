import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import { useReducer } from 'react'

export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      }
    })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes:0})
    
    notificationDispatch({
      type: 'NEW_NOTIFICATION',
      payload: `Anecdote '${content}' has been successfully added`})

    setTimeout(function removeNotification(){
      notificationDispatch({
        type: 'HIDE_NOTIFICATION',
        payload: null
      })
    }, 5 * 1000)
  }

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    notificationDispatch({
      type: 'NEW_NOTIFICATION',
      payload: `anecdote '${anecdote.content}' voted`})
    }
    setTimeout(function removeNotification(){
      notificationDispatch({
        type: 'HIDE_NOTIFICATION',
        payload: null
      })
    }, 5 * 1000)

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: false
    }
  )

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteForm
