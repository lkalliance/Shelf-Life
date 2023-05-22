const { Schema } = require('mongoose');
const shelfSchema = require('./Shelf');
const Book = require('./Book')

const bookcaseSchema = new Schema({
    _id: false,
    shelves: [shelfSchema],
    unshelved: [Book.schema],

  });
  
  module.exports = bookcaseSchema;