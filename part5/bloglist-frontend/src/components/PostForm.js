import React, { useState } from 'react'

const PostForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleNewBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form id='form' onSubmit={handleSubmit}>
        <label>
          <p>
            Title:
            <input
              id='title'
              type='text'
              value={title}
              name='Title:'
              onChange={handleTitleChange}
              placeholder='title'
            />
          </p>
        </label>
        <label>
          <p>
            Author:
            <input
              id='author'
              type='text'
              value={author}
              name="Author:"
              onChange={handleAuthorChange}
              placeholder='author'
            />
          </p>
        </label>
        <label>
          <p>
            Url:
            <input
              id='url'
              type='text'
              value={url}
              name="Url:"
              onChange={handleUrlChange}
              placeholder='url'
            />
          </p>
        </label>
        <button id='create' type='submit'>create</button>
      </form>
    </div>
  )
}


export default PostForm
