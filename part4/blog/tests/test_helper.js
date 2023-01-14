const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Hello',
    author: 'beebo',
    url: 'www.google.com',
    likes: 3,
    id: '63bb33c82f9877ef3172c643'
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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
