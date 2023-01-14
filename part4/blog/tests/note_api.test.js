const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/email')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const emailObject = helper.initialEmails
    .map(note => new Blog(note))
  const promiseArray = emailObject.map(note => note.save())
  await Promise.all(promiseArray)

  // helper.initialEmails.forEach(async (email) => {
  //   let emailObject = new Blog(email)
  //   await emailObject.save()
  console.log('saved')
  
  console.log('done')
})

test('all blogs are returned', async () => {
  console.log('entered test')
  const response = await api.get('/api/emails')
  console.log(response.body)

  expect(response.body).toHaveLength(helper.initialEmails.length)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})
