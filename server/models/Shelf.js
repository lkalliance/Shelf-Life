const { Schema } = require('mongoose');
const Book = require('./Book');

const shelfSchema = new Schema({
    left: [Book.schema],
    right: [Book.schema],
});
  
module.exports = shelfSchema;