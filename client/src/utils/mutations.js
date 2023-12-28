import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!, $year: String!) {
    login(email: $email, password: $password, year: $year) {
      token
      user {
        _id
        userName
        bookList {
          title
          authors
          description
          image
          bookId
          rating
          comment
          color
          text
          style
          height
          thickness
          year
          audio
        }
      }
      bookcase {
        year
        user_id
        shelves {
          left {
            bookId
            title
            shortTitle
            authors
            description
            image
            style
            height
            thickness
            color
            text
            audio
          }
          right {
            bookId
            title
            shortTitle
            authors
            description
            image
            style
            height
            thickness
            color
            text
            audio
          }
        }
        unshelved {
          bookId
          title
          shortTitle
          authors
          description
          image
          style
          height
          thickness
          color
          text
          audio
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
    $shortTitle: String
    $audio: Boolean
    $bookId: String!
    $authors: [String]
    $image: String
    $text: String
    $description: String
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
      shortTitle: $shortTitle
      audio: $audio
      bookId: $bookId
      authors: $authors
      image: $image
      description: $description
      color: $color
      height: $height
      thickness: $thickness
      style: $style
      rating: $rating
      comment: $comment
      year: $year
      text: $text
    ) {
      bookList {
        authors
        bookId
        color
        text
        comment
        description
        height
        image
        rating
        style
        thickness
        title
        shortTitle
        audio
        year
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation Mutation($bookId: String!, $year: String, $audio: Boolean) {
    removeBook(bookId: $bookId, year: $year, audio: $audio) {
      _id
    }
  }
`;

export const ARRANGE_BOOKCASE = gql`
  mutation ArrangeBookcase($bookcase: BookcaseInput!) {
    arrangeBookcase(bookcase: $bookcase) {
      year
      shelves {
        left {
          bookId
          title
          shortTitle
          authors
          image
          description
          style
          height
          thickness
          color
          text
        }
        right {
          bookId
          title
          shortTitle
          authors
          image
          description
          style
          height
          thickness
          color
          text
        }
      }
      unshelved {
        bookId
        title
        shortTitle
        authors
        image
        description
        style
        height
        thickness
        color
        text
      }
    }
  }
`;
