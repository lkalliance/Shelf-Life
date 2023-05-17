const { Schema } = require('mongoose');
const shelfSchema = require('./Shelf');
const Book = require('./Book')

const bookcaseSchema = new Schema({
    shelves: [shelfSchema],
    unshelved: [Book],

  });
  
  module.exports = bookcaseSchema;