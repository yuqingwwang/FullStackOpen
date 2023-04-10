const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1
  },
  born: {
    type: Number,
    default: null
  },
  bookList: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
    }
  ]
})

module.exports = mongoose.model('Author', schema)
