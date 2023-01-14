const Email = require('../models/email')

const initialEmails = [
  {
    title: 'Hello',
    author: 'beebo',
    url: 'www.google.com',
    likes: 3,
    id: '63bb33c82f9877ef3172c643'
  }
]

const nonExistingId = async () => {
  const email = new Email({})
  await email.save()
  await email.remove()

  return email._id.toString()
}

const emailsInDb = async () => {
  const emails = await Email.find({})
  return emails.map(email => email.toJSON())
}

module.exports = {
  initialEmails, nonExistingId, emailsInDb
}
