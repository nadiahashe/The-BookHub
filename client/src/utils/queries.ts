import { gql } from "@apollo/client";

// Gets all books in the logged-in user's collection. Requires no arguments.
export const GET_MY_BOOKS=gql`
    query Me {
      me {
        books {
          _id
          authors
          bookId
          image
          review {
            content
            progress
            shared
            username
          }
          title
        }
      }
    }
`

// Get one book by _id, including the nested review. Requires book's _id as argument.
export const GET_ONE_BOOK=gql`
    query GetBook($id: ID!) {
      getBook(_id: $id) {
        _id
        authors
        bookId
        image
        title
        review {
          content
          progress
          shared
          username
        }
      }
    }
`

// Get an array of book objects from google book search. Requires search string as argument.
export const GOOGLE_BOOK_SEARCH=gql`
    query BookSearch($string: String!) {
      bookSearch(string: $string) {
        authors
        bookId
        image
        title
      }
    }
`

// Get an array of all reviews of a book. Requires bookId as argument.
export const GET_BOOK_REVIEWS=gql`
    query BookReviews($bookId: String!) {
      bookReviews(bookId: $bookId) {
        _id
        review {
          content
          username
        }
      }
    }
`