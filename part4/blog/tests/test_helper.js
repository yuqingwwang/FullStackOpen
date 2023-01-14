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
  const note = new Email({})
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialEmails, nonExistingId, notesInDb
}
