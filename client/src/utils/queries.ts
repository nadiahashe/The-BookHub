import { gql } from "@apollo/client";


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