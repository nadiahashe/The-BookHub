import { gql } from "@apollo/client";

export const SIGNUP=gql`
    mutation Signup($email: String!, $password: String!, $username: String!) {
      signup(email: $email, password: $password, username: $username) {
        token
      }
    }
`

export const LOGIN=gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
`

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