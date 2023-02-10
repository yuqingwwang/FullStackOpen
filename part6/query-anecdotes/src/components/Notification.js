import { useReducer } from 'react'
import notificationReducer from './AnecdoteForm'

const Notification = () =>{
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if(notification===null){
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
