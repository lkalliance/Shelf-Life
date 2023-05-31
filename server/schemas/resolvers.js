const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Bookcase } = require("../models");

// saving of shelves add shelves

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user && args.fetchMe) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError(
        "Either you are not logged in or you already have the data!"
      );
    },
    bookcase: async (parent, args, context) => {
      if (context.user && args.fetchMe) {
        return Bookcase.findOne({
          user_id: context.user._id,
          year: args.year,
        });
      }
      throw new AuthenticationError(
        "Either you are not logged in or you already have the data!"
      );
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const { userName, email, password } = args;
      const newUser = {
        userName,
        email,
        password,
        bookList: [],
      };

      const user = await User.create(newUser);
      const token = signToken(user);
      const newBookcase = {
        user_id: user._id,
        year: "2023",
        shelves: [
          { left: [], right: [] },
          { left: [], right: [] },
        ],
        unshelved: [],
      };

      const bookcase = await Bookcase.create(newBookcase);

      return { token, user, bookcase };
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
      const year = new Date();
      const bookcase = await Bookcase.findOne({
        user_id: user._id,
        year: year.getFullYear(),
      });

      return { token, user, bookcase };
    },

    addBook: async (parent, args, context) => {
      if (context.user) {
        // updatedbookList works
        const updatedArgs = { ...args };
        if (args.color === "") updatedArgs.color = "white";
        if (args.height === "") updatedArgs.height = "medium";
        if (args.thickness === "") updatedArgs.thickness = "mid";
        if (args.style === "") updatedArgs.style = "paperback";

        const updatebookList = await User.findOneAndUpdate(
          { _id: context.user._id }, //filter
          { $addToSet: { bookList: updatedArgs } },
          { new: true }
        );

        // adds book
        const updateBook = await Bookcase.findOneAndUpdate(
          { user_id: context.user._id, year: args.year }, //filter
          { $addToSet: { unshelved: updatedArgs } },
          { new: true }
        );
        return { updatebookList, updateBook };
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

        return { updatebookList, updateBook };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    arrangeBookcase: async (parent, args, context) => {
      if (context.user) {
        const updateShelves = await Bookcase.findOneAndUpdate(
          { user_id: context.user._id, year: args.bookcase.year },
          { $set: { shelves: args.bookcase.shelves } },
          { new: true }
        );
        const updateUnshelved = await Bookcase.findOneAndUpdate(
          { user_id: context.user._id, year: args.bookcase.year },
          { $set: { unshelved: args.bookcase.unshelved } },
          { new: true }
        );
        return { updateShelves, updateUnshelved };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
