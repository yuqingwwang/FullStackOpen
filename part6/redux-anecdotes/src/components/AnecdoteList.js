
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()
  // const anecdotes = useSelector(state => state.anecdote)
  // const byVotes= (b1, b2) => b2.votes>=b1.votes ? 1 : -1

  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdote
    }
    return state.anecdote.filter((an) =>
        an.content
          .toLowerCase()
          .includes(state.filter.toLowerCase()))
  })
  .sort((a, b) => b.votes - a.votes)

    const increaseVote = (id) => {
      dispatch(vote(id))
    }

  return (
    <div>
    {anecdotes.map(
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
    )}
    </div>
  )
}

export default NewAnecdote
