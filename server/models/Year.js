const { Schema } = require('mongoose');
const bookcaseSchema = require('./Bookcase');

const yearSchema = new Schema({
    _id: false,
    bookcaseYear: {
      type: String,
    },
    bookcase: [bookcaseSchema], 


  });
  
  module.exports = yearSchema;