import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me($fetchMe: Boolean) {
    me(fetchMe: $fetchMe) {
      _id
      userName
      bookList {
        bookId
        title
        authors
        image
        description
        rating
        comment
        year
      }
    }
  }
`;

export const QUERY_BOOKCASE = gql`
  query Bookcase($year: Int!, $fetchMe: Boolean) {
    bookcase(year: $year, fetchMe: $fetchMe) {
      shelves {
        left {
          authors
          bookId
          color
          comment
          image
          description
          height
          rating
          style
          thickness
          title
          year
        }
        right {
          authors
          bookId
          color
          comment
          image
          description
          height
          rating
          style
          thickness
          title
          year
        }
      }
      unshelved {
        authors
        bookId
        color
        comment
        image
        description
        height
        rating
        style
        thickness
        title
        year
      }
      user_id
      year
    }
  }
`;
