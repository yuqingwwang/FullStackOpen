import { useState } from 'react'


const Blog = ({blog})=> {

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

  return(
  <div style={blogStyle}>
    <div>
      {blog.title} <button onClick={toggleVisibility}>View</button>
    </div>
    <div style={showWhenVisible}>
      {blog.url} <br></br>
      {blog.likes} <br></br>
      {blog.author}
    <button onClick={toggleVisibility}>Hide</button>
      </div>
  </div>
  )
}

export default Blog
