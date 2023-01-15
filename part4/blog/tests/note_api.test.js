const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length
    )}, 1000)

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newBlog =
      {
        'title': 'Hey',
        'author': 'John',
        'url': 'www.google.com',
        'likes': 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(n => n.title)
      expect(titles).toContain(
        'Hey'
      )
    }, 1000)
  })


  test('likes not missing', async () => {
    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    expect(likes).toEqual(expect.not.stringContaining('0'))
  }, 1000)

  test('fails with status code 400 if data invalid', async () => {
    const newBlog =
    {
      'author': 'John',
      'likes': 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 1000)

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const title = blogsAtEnd.map(r => r.title)

      expect(title).not.toContain(blogToDelete.title)
    })
  })

  test('updating the blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = (
      {
        'title': 'Hello',
        'url': 'www.wikipedia.com',
        'likes': 200,
        'id': blogToUpdate.id
      })

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    console.log(blogsAtEnd)

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
  }, 1000)
})

afterAll(() => {
  mongoose.connection.close()
})
