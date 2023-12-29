const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bookSchema = new Schema({
  _id: false,
  title: {
    type: String,
    required: true,
  },
  audio: {
    type: Boolean,
    required: false,
    default: false,
  },
  shortTitle: {
    type: String,
  },
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  text: {
    type: String,
  },
  textSize: {
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
    type: String,
  },
  bookId: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
