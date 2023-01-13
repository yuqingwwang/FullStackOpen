const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/email')

beforeEach(async () => {
  await Blog.deleteMany({})
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(helper.initialNotes.length)
})
