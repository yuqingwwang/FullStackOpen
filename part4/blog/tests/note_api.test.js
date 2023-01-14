const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/email')

beforeEach(async () => {
  await Blog.deleteMany({})

  console.log('cleared')

  for (let email of helper.initialEmails) {
    let emailObject = new Blog(email)
    await emailObject.save()}

  console.log('saved')
})

test('all blogs are returned', async () => {
  console.log('entered test')
  const response = await api.get('/api/emails')

  expect(response.body).toHaveLength(helper.initialEmails.length)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})
