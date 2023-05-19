const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bookSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    shortTitle: {
        type: String,
    },
    authors: [
      {
        type: String,
      },
    ],
    color: {
        type: String,
    },
    height: {
        type: String,
    },
    thickness: {
        type: String,
    },
    style: {
        type: String,
    },
    bookId: {
        type: String,
        required: true,
    },
});

const Book = mongoose.model('Book', bookSchema);
  
module.exports = Book;