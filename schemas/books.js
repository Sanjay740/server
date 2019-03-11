const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BooksSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  inStock: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Books = mongoose.model('book', BooksSchema);
