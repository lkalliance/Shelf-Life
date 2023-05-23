const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bookSchema = new Schema({
    _id: false,
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
    image: {
        type: String,
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
    year: {
        type: String
    },
    bookId: {
        type: String,
        required: true
    },
});

const Book = mongoose.model('Book', bookSchema);
  
module.exports = Book;