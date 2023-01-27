import { useState } from 'react'

const Blog = ({
  blog,
  handleLike,
  handleDelete,
  loggedUser
}) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteButton = () => {
    if (blog.user.username === loggedUser) {
      return (
        <button id='delete' onClick={() => handleDelete()}>delete</button>
      )
    }
  }

  return(
    <div style={blogStyle}>
      <div className='blog'>
        <div placeholder='default'>
          {blog.title} {blog.author}
        </div>
        <button onClick={toggleVisibility} style={hideWhenVisible}>View</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>Hide</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          {deleteButton()}
        </div>
      </div>
    </div>
  )
}

export default Blog
