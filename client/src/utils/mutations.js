import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        _id
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation Mutation(
    $title: String!
    $bookId: String!
    $authors: [String]
    $color: String
    $height: String
    $thickness: String
    $style: String
    $rating: Int
    $comment: String
    $year: String
  ) {
    addBook(
      title: $title
      bookId: $bookId
      authors: $authors
      color: $color
      height: $height
      thickness: $thickness
      style: $style
      rating: $rating
      comment: $comment
    ) {
      bookList {
        bookId
        title
        year
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation Mutation($bookId: ID!, $year: String!) {
    removeBook(bookId: $bookId) {
      _id
    }
  }
`;

export const ARRANGE_BOOKCASE = gql`
  mutation ArrangeBookcase($bookcase: YearInput) {
    arrangeBookcase(bookcase: $bookcase) {
      _id
    }
  }
`;
