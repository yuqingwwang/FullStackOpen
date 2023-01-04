const Notification = ({ message, messageClass}) => {
  if (message === null) {
    return null
  }

  if (messageClass === 'bad') {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  
  if (messageClass === 'good') {
    return (
      <div className='good'>
        {message}
      </div>
    )
  }
}

export default Notification
