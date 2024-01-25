import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me($fetchMe: Boolean) {
    me(fetchMe: $fetchMe) {
      _id
      userName
      bookList {
        bookId
        title
        audio
        authors
        image
        description
        rating
        comment
        year
        color
        text
        textSize
        height
        thickness
        style
      }
    }
  }
`;

export const QUERY_BOOKCASE = gql`
  query Bookcase($year: String!, $fetchMe: Boolean) {
    bookcase(year: $year, fetchMe: $fetchMe) {
      shelves {
        left {
          authors
          bookId
          color
          text
          textSize
          comment
          image
          description
          height
          rating
          style
          thickness
          title
          shortTitle
          audio
          year
        }
        right {
          authors
          bookId
          color
          text
          textSize
          comment
          image
          description
          height
          rating
          style
          thickness
          title
          shortTitle
          audio
          year
        }
      }
      unshelved {
        authors
        bookId
        color
        text
        textSize
        comment
        image
        description
        height
        rating
        style
        thickness
        title
        shortTitle
        audio
        year
      }
      user_id
      year
    }
  }
`;

export const QUERY_USER_BOOKCASE = gql`
  query UserBookcase($year: String!, $user: String!) {
    userBookcase(year: $year, user: $user) {
      shelves {
        left {
          authors
          bookId
          color
          text
          textSize
          comment
          image
          description
          height
          rating
          style
          thickness
          title
          shortTitle
          audio
          year
        }
        right {
          authors
          bookId
          color
          text
          textSize
          comment
          image
          description
          height
          rating
          style
          thickness
          title
          shortTitle
          audio
          year
        }
      }
      unshelved {
        authors
        bookId
        color
        text
        textSize
        comment
        image
        description
        height
        rating
        style
        thickness
        title
        shortTitle
        audio
        year
      }
      user_id
      userName
      year
    }
  }
`;
