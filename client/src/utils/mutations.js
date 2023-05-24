import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
        bookList {
          title
          authors
          bookId
          rating
          comment
        }
      }
      bookcase {
        year
        user_id
        shelves {
          left {
            bookId
            title
            authors
            style
            height
            thickness
            color
          }
          right {
            bookId
            title
            authors
            style
            height
            thickness
            color
          }
        }
        unshelved {
          bookId
          title
          authors
          style
          height
          thickness
          color
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($userName: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, email: $email, password: $password) {
      token
      user {
        userName
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
      year: $year
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
  mutation Mutation($bookcase: BookcaseInput) {
    arrangeBookcase(bookcase: $bookcase) {
      year
      shelves {
        left {
          bookId
          title
          authors
          style
          height
          thickness
          color
        }
        right {
          bookId
          title
          authors
          style
          height
          thickness
          color
        }
      }
      unshelved {
        bookId
        title
        authors
        style
        height
        thickness
        color
      }
    }
  }
`;
