import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      bookList {
        bookId
        title
        authors
        rating
        comment
        year
      }
      years {
        bookcase {
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
        bookcaseYear
      }
    }
  }
`;

export const QUERY_BOOKCASE = gql`
  query Bookcase {
    bookcase {
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
