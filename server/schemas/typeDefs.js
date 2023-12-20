const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID
    user: User
  }

  type AuthReturn {
    token: ID
    user: User
    bookcase: Bookcase
  }

  type DeleteReturn {
    message: String
  }

  type User {
    _id: ID
    userName: String
    email: String
    password: String
    bookList: [Book]
  }

  type Bookcase {
    _id: ID
    user_id: ID
    year: String
    shelves: [Shelf]
    unshelved: [Book]
  }

  input BookcaseInput {
    fetched: Boolean
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
    bookId: String!
    title: String!
    image: String
    description: String
    authors: [String]
    style: String
    height: String
    thickness: String
    text: String
    color: String
    year: String
    rating: Int
    comment: String
  }

  input BookInput {
    bookId: String!
    title: String!
    image: String
    description: String
    authors: [String]
    style: String
    height: String
    thickness: String
    text: String
    color: String
    year: String
    rating: Int
    comment: String
  }

  type Query {
    me(fetchMe: Boolean): User
    bookcase(year: String!, fetchMe: Boolean): Bookcase
  }

  type Mutation {
    addUser(userName: String!, email: String!, password: String!): Auth
    addBookcase(
      user_id: ID!
      year: String
      shelves: [ShelfInput]
      unshelved: [BookInput]
    ): Bookcase
    login(email: String!, password: String!, year: String!): AuthReturn
    addBook(
      title: String!
      shortTitle: String
      authors: [String]
      image: String
      description: String
      color: String = "white"
      text: String = "#000000"
      height: String = "medium"
      thickness: String = "mid"
      style: String = "paperback"
      bookId: String!
      rating: Int = 0
      comment: String = ""
      year: String
    ): User
    removeBook(bookId: String!, year: String): User
    arrangeBookcase(bookcase: BookcaseInput!): Bookcase
  }
`;

module.exports = typeDefs;
