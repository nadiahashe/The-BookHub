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
          shared
          username
        }
        progress
      }
    }
`

// Creates or updates review on a book. Requires book _id, shared boolean, progress string, content string. Returns updated book object.
export const UPDATE_REVIEW=gql`
    mutation UpdateReview($id: ID!, $shared: Boolean, $content: String) {
      updateReview(id: $id, shared: $shared, content: $content) {
        _id
        authors
        bookId
        image
        title
        review {
          content
          shared
          username
        }
        progress
      }
    }
`

// Adds a new user to the database.
export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

// Adds a new message to a club's discussion.
export const CREATE_DISCUSSION = gql`
  mutation CreateDiscussion($groupId: ID!, $title: String!, $image: String, $authors: [String], $bookId: String!) {
    createDiscussion(groupId: $groupId, title: $title, image: $image, authors: $authors, bookId: $bookId) {
      _id
      title
      image
      authors
      bookId
      comments {
        commentId
        content
        username
      }
    }
  }
`;

// Updates progress on a specific book.
export const UPDATE_BOOK_PROGRESS = gql`
  mutation UpdateProgress($bookId: ID!, $progress: Int!) {
    updateProgress(bookId: $bookId, progress: $progress) {
      _id
      progress
      image
      bookId
      authors
      title
    }
  }
`;

// Creates group, adds creator to users array
export const CREATE_GROUP = gql`
  mutation CreateGroup($groupname: String!, $leader: ID!, $description: String) {
    createGroup(groupname: $groupname, leader: $leader, description: $description) {
      _id
      description
      groupname
    }
  }
`

// Creates comments, adds to discussion array
export const CREATE_COMMENT = gql`
  mutation CreateComment($disussionId: ID!, $content: String, $username: String) {
    createComment(disussionId: $disussionId, content: $content, username: $username) {
      comments {
        commentId
        content
        username
      }
      _id
    }
  }
`

// Adds user to group, updates group user array
export const ADD_USER_TO_GROUP = gql`
  mutation AddUserToGroup($username: String!, $groupId: ID!) {
    addUserToGroup(username: $username, groupId: $groupId) {
      _id
      groupname
      description
      users {
        _id
        username
      }
    }
  }
`
// Get an array of book objects from google book search. Requires search string as argument.
export const GOOGLE_BOOK_SEARCH=gql`
    mutation BookSearch($string: String!) {
      bookSearch(string: $string) {
        authors
        bookId
        image
        title
      }
    }
`