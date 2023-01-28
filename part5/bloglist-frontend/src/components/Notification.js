const Notification = ({ message, messageClass='bad' }) => {
  if (message === null) {
    return null
  }
  if (messageClass === 'bad') {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  if (messageClass === 'success') {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}

export default Notification
