const { Schema } = require('mongoose');
const bookcaseSchema = require('./Bookcase');

const yearSchema = new Schema({
    bookcaseYear: {
      type: String,
    },
    bookcase: [bookcaseSchema], 


  });
  
  module.exports = yearSchema;