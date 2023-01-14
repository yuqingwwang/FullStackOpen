const emailsRouter = require('express').Router()
const Email = require('../models/email')

emailsRouter.get('/', (request, response, next) => {
  Email
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

emailsRouter.get('/:id', async(request, response) => {
  const email = await Email.findById(request.params.id)
  if (email) {
    response.json(email)
  } else {
    response.status(404).end()
  }
})

emailsRouter.post('/', async (request, response) => {

  const email = new Email(request.body)

  const savedNote = await email.save()
  response.status(201).json(savedNote)
})

module.exports = emailsRouter
