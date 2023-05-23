const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookList: [Booklist]
  }

  type Bookcase {
    _id: ID
    user_id: ID
    year: String
    shelves: [Shelf]
    unshelved: [Book]
  }

  input BookcaseInput {
    user_id: ID
    year: String
    shelves: [ShelfInput]
    unshelved: [BookInput]
  }

  type Shelf {
    _id: ID
    left: [Book]
    right: [Book]
  }

  input ShelfInput {
    left: [BookInput]
    right: [BookInput]
  }

  type Book {
    _id: ID
    title: String
    shortTitle: String
    authors: [String]
    color: String
    height: String
    thickness: String
    style: String
    comment: String
    rating: Int
    year: String
    bookId: String
  }

  input BookInput {
    bookId: String!
    title: String!
    shortTitle: String
    authors: [String]
    style: String
    height: String
    thickness: String
    color: String
    year: String
    rating: Int
    comment: String
  }

  type Query {
    me: User
  }

  type Query {
    bookcase: Bookcase
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(
      title: String!
      shortTitle: String
      authors: [String]
      color: String
      height: String
      thickness: String
      style: String
      bookId: String!
      rating: Int
      comment: String
      year: String
    ): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
