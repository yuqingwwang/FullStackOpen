import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blog, setNewBlog] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

      console.log(user)
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
    // const blogObject = {
    //   title: title,
    //   author: author,
    //   url: url
    // }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })

    setSuccessMessage('a new blog '+ blogObject.title +' by '+ blogObject.author + ' added')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000);
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
    <Togglable buttonLabel='new blog'>
          <BlogForm
            createBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
    </Togglable>

  //   <div>
  //     <h2>create new</h2>
  //     <form onSubmit={addBlog}>
  //       <div>
  //         title:
  //         <input
  //           type="text"
  //           value={title}
  //           name="Title"
  //           onChange={({ target }) => setTitle(target.value)}
  //         />
  //       </div>
  //       <div>
  //         author:
  //         <input
  //           type="text"
  //           value={author}
  //           name="Author"
  //           onChange={({ target }) => setAuthor(target.value)}
  //         />
  //       </div>
  //       <div>
  //         url:
  //         <input
  //           type="text"
  //           value={url}
  //           name="Url"
  //           onChange={({ target }) => setUrl(target.value)}
  //         />
  //       </div>
  //       <button type="submit">create</button>
  //     </form>
  // </div>
  )

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
        {blogForm()}
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
        </div>
      }
    </div>
  )

}

export default App
