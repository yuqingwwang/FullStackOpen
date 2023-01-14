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

test('new posts can be made', async () => {
  console.log('entered test')

  const newEmail =
  {
    'title': 'Hey',
    'author': 'John',
    'url': 'www.google.com',
    'likes': 10
  }

  await api
    .post('/api/emails')
    .send(newEmail)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const emailsAtEnd = await helper.emailsInDb()

  expect(emailsAtEnd).toHaveLength(helper.initialEmails.length + 1)

  const titles = emailsAtEnd.map(n => n.title)
  expect(titles).toContain('Hey'
  )
}, 100000)

test('likes not missing', async () => {
  console.log('entered test')
  const response = await api.get('/api/emails')

  const likes = response.body.map(r => r.likes)
  console.log(likes)

  expect(likes).toEqual(expect.not.stringContaining('0'))
}, 100000)


afterAll(() => {
  mongoose.connection.close()
})
