const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('verify there is an id', async() => {
  console.log('entered test')
  const response = await api.get('/api/blogs')
  console.log(response.body['id'])

  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
