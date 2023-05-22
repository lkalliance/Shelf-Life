const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User } = require("../models");
const Booklist = require("../models/Booklist");

// adding book adds to both booklist and book
// saving of shelves add shelves

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const { username, email, password } = args;
      const newUser = {
        username,
        email,
        password,
        bookList: [],
        years: [
          {
            bookcaseYear: new Date().getFullYear().toString(),
            bookcase: {
              shelves: [
                { left: [], right: [] },
                { left: [], right: [] },
              ],
              unshelved: [],
            },
          },
        ],
      };
      const user = await User.create(newUser);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addBook: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        console.log(args);
        // updatedbookList works
        const updatebookList = await User.findOneAndUpdate(
          { _id: context.user._id }, //filter
          { $addToSet: { bookList: args } },
          { new: true }
        );

        // adds book but creates multiple year objects, needs to be fixed fix
        const updateBook = await User.findOneAndUpdate(
          { _id: context.user._id }, //filter
          { $addToSet: { years: { bookcase: { unshelved: args } } } },
          { new: true }
        );
        updatedUser = updatebookList + updateBook;
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // updatedbookList works, updateBook still needs to be fix to pull book from nested
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatebookList = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { bookList: { bookId } } },
          { new: true }
        );
        const updateBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { Book: { bookId } } },
          { new: true }
        );
        updatedUser = updatebookList + updateBook;
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // add shelves
    // save shelves
  },
};

module.exports = resolvers;
