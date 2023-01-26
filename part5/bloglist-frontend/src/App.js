import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'

import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [blog, setNewBlog] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })

    setSuccessMessage('a new blog '+ blogObject.title +' by '+ blogObject.author + ' added')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleLike = async(blog) => {

    const likedBlog = await blogService.like(blog)

    setBlogs(
      blogs.map(blog =>
        blog.id === likedBlog.id
          ? { ...blog, likes: likedBlog.likes }
          : blog
      ))
    setNewBlog('')

    setSuccessMessage('You liked: ' + likedBlog.title )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleDelete = async (blog) => {

    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog)
      setBlogs(
        blogs.filter(currnetBlog => currnetBlog.id !== blog.id)
      )
    }
  }

  const loginForm = () => {
    return (
    <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
    </Togglable>
    )
  }

  const blogForm = () => (
    <BlogList
      blogs={blogs}
      byLikes={byLikes}
      handleLike={handleLike}
      handleDelete={handleDelete}
      loggedUser={user.username}
    />
  )

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Notification message={successMessage} messageClass='success' />
      <Notification message={errorMessage} messageClass='bad'/>
      {user === null ?
        loginForm():
        <div>
          <h2>blogs</h2>
          <p>{JSON.parse(window.localStorage.loggedNoteappUser).username} logged in
            <button onClick={handleLogOut}>Log out</button> </p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <PostForm
              handleNewBlog={addBlog}
            />
          </Togglable>
          {blogForm()}
        </div>
      }
    </div>
  )

}

export default App
