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
// Gets user information by ID. Used for Profile page.
export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      _id
      name
      email
      favoriteBooks {
        _id
        title
        author
        progress
      }
      clubMemberships {
        _id
        name
        description
      }
    }
  }
`;

// Gets club details by club ID. Used for Club page.
export const GET_CLUB = gql`
  query getClub($clubId: ID!) {
    getClub(id: $clubId) {
      _id
      name
      description
      members {
        _id
        name
        email
      }
    }
  }
`;

// Gets all discussions for a club. Used for Club Discussion component.
export const GET_DISCUSSIONS = gql`
  query getDiscussions($clubId: ID!) {
    getDiscussions(clubId: $clubId) {
      _id
      clubId
      bookId
      userId
      message
      timestamp
    }
  }
`;

// Gets progress of a specific book by its ID. Used for Book Progress page.
export const GET_BOOK_PROGRESS = gql`
  query getBookProgress($bookId: ID!) {
    getBookProgress(bookId: $bookId) {
      _id
      title
      author
      progress
    }
  }
`;

// Adds a new user to the database.
export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

// Adds a new message to a club's discussion.
export const ADD_DISCUSSION = gql`
  mutation addDiscussion($clubId: ID!, $bookId: ID!, $userId: ID!, $message: String!) {
    addDiscussion(clubId: $clubId, bookId: $bookId, userId: $userId, message: $message) {
      _id
      clubId
      bookId
      userId
      message
      timestamp
    }
  }
`;

// Updates progress on a specific book.
export const UPDATE_BOOK_PROGRESS = gql`
  mutation addBookProgress($bookId: ID!, $progress: Int!) {
    addBookProgress(bookId: $bookId, progress: $progress) {
      _id
      title
      progress
    }
  }
`;

export default {
  GET_MY_BOOKS,
  GET_ONE_BOOK,
  GOOGLE_BOOK_SEARCH,
  GET_BOOK_REVIEWS,
  GET_USER,
  GET_CLUB,
  GET_DISCUSSIONS,
  GET_BOOK_PROGRESS,
  ADD_USER,
  ADD_DISCUSSION,
  UPDATE_BOOK_PROGRESS,
};