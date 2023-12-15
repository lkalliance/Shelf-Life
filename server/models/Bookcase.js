const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const shelfSchema = require("./Shelf");
const Book = require("./Book");

const bookcaseSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  year: {
    type: String,
  },
  shelves: [shelfSchema],
  unshelved: [Book.schema],
});

const Bookcase = mongoose.model("Bookcase", bookcaseSchema);

module.exports = Bookcase;
