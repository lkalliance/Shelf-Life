const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID
    user: User
  }

  type User {
    _id: ID
    userName: String
    email: String
    password: String
    years: [Year]
    bookList: [Booklist]
  }

  type Year {
    _id: ID
    bookcaseYear: String
    bookcase: [Bookcase]
  }

  input YearInput {
    bookcaseYear: String
    bookcase: BookcaseInput
  }

  type Bookcase {
    _id: ID
    shelves: [Shelf]
    unshelved: [Book]
  }

  input BookcaseInput {
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
  }

  type Booklist {
    _id: ID
    title: String
    authors: [String]
    rating: Int
    comment: String
    year: String
    bookId: String
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(userName: String!, email: String!, password: String!): Auth
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
    arrangeBookcase(bookcase: YearInput): Bookcase
  }
`;

module.exports = typeDefs;
