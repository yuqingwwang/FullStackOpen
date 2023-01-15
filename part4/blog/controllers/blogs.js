const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

blogsRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)

  const savedBlogs = await blog.save()
  response.status(201).json(savedBlogs)
})

blogsRouter.delete('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)

  if(!blog){
    response.status(204).end()
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new:true }
  )
  response.json(updatedBlog.toJSON())

})

module.exports = blogsRouter
