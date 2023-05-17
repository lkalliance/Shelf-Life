const { Schema } = require('mongoose');

const booklistSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    authors: [
      {
        type: String,
      },
    ],
    image: {
        type: String,
    },
    rating: {
        type: String,
    },
    comment: {
        type: String,
    },
    year: {
        type: String
    },
    bookId: {
      type: String,
      required: true,
    },
});

  const Booklist = mongoose.model('Booklist', booklistSchema);
  
  module.exports = Booklist;