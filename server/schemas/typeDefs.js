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

  type Bookcase {
    _id: ID
    shelves: [Shelf]
    unshelved: [Book]
  }

  type Shelf {
    _id: ID
    left: [Book]
    right: [Book]
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
    user: User

  }

  type Mutation {
    addUser(userName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(title: String!, shortTitle: String, authors: [String], color: String, height: String, thickness: String, style: String, bookId: String!, rating: Int, comment: String, year: String): User
    removeBook(bookId: ID!): User
    
  
  }

`;

module.exports = typeDefs;