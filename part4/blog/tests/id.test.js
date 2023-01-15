const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')


const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('verify there is an id', async() => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)
  console.log(ids)

  expect(ids).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
