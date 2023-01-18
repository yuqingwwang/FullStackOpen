const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    title: 'Hello',
    author: 'beebo',
    url: 'www.google.com',
    likes: 3,
    id: '1'
  }
]

const nonExistingId = async () => {
  const blogs = new Blog({})
  await blogs.save()
  await blogs.remove()

  return blogs._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
