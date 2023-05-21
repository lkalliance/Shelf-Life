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
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        // seperate addbook for book and addBookList for book list change args to object for the right ones
        // add shelves 
        // save shelves
        addBook: async (parent, args, context) => {
            if (context.user) {
                console.log(args);
              const updatebookList = await User.findOneAndUpdate(
                { _id: context.user._id }, //filter
                { $addToSet: { bookList: args } },
                { new: true }
              );
              const updateBook = await User.findOneAndUpdate(
                { _id: context.user._id }, //filter
                { $addToSet: { years: {bookcase: { unshelved: args } } } },
                { new: true }
              );
              updatedUser = updatebookList + updateBook;
              return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        
        // will need updates to pull book from nested
        removeBook: async (parent, { bookId }, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { Booklist: { bookId: bookId } } },
                { $pull: { Book: { bookId: bookId } } },
                { new: true }
            );
      
            return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },





  }
};

module.exports = resolvers;