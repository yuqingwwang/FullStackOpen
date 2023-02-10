import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(AnecdoteContext)
  console.log(notificationAndDispatch)
  return notificationAndDispatch[0]
}

export const useAnecdoteDispatch = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[1]
}

export default AnecdoteContext
