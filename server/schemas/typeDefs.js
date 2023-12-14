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
    image: String
    description: String
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
    image: String
    description: String
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
    login(email: String!, password: String!): AuthReturn
    addBook(
      title: String!
      shortTitle: String
      authors: [String]
      image: String
      description: String
      color: String = "white"
      height: String = "medium"
      thickness: String = "mid"
      style: String = "paperback"
      bookId: String!
      rating: Int
      comment: String
      year: String
    ): User
    removeBook(bookId: String!): User
    arrangeBookcase(bookcase: BookcaseInput): Bookcase
  }
`;

module.exports = typeDefs;
