const emailsRouter = require('express').Router()
const Email = require('../models/email')

emailsRouter.get('/', (request, response) => {
  Email
    .find({})
    .then(blogs => {
    response.json(blogs)
  })
  .catch(error => next(error))
})

emailsRouter.post('/', (request, response, next) => {
  const email = new Email(request.body)

  email
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = emailsRouter
