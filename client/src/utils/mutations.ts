import { gql } from "@apollo/client";

// Creates a user. Requires email, password, and username arguments. Returns JSON token.
export const SIGNUP=gql`
    mutation Signup($email: String!, $password: String!, $username: String!) {
      signup(email: $email, password: $password, username: $username) {
        token
      }
    }
`

// Logs in user. Requires email and password as arguments. Returns JSON token.
export const LOGIN=gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
`

// Adds a book to the user's collection. Requires title string, author array, image string, bookId string from google book search. Returns book object.
export const ADD_BOOK=gql`
    mutation AddBook($title: String!, $authors: [String], $image: String, $bookId: String) {
      addBook(title: $title, authors: $authors, image: $image, bookId: $bookId) {
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

// Creates or updates review on a book. Requires book _id, shared boolean, progress string, content string. Returns updated book object.
export const UPDATE_REVIEW=gql`
    mutation UpdateReview($id: ID!, $shared: Boolean, $progress: String, $content: String) {
      updateReview(_id: $id, shared: $shared, progress: $progress, content: $content) {
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