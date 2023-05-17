const { Schema } = require('mongoose');
const Book = require('./Book');

const shelfSchema = new Schema({
    left: [Book],
    right: [Book],
});
  
module.exports = shelfSchema;