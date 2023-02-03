import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  const byVotes= (b1, b2) => b2.votes>=b1.votes ? 1 : -1

  const increaseVote = (id) => {
    dispatch(vote(id))
  }

  return (
    anecdotes.sort(byVotes).map(
      anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => increaseVote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default NewAnecdote
