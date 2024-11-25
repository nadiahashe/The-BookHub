import { gql } from "@apollo/client";

// Gets all books in the logged-in user's collection. Requires no arguments.
export const GET_ME=gql`
  query Me {
    me {
      username
      books {
        _id
        authors
        bookId
        image
        title
        progress
      }
      groups {
        _id
        groupname
        description
      }
      invitations {
        _id
        groupname
      }
    }
  }
`

// Get one book by _id, including the nested review. Requires book's _id as argument.
export const GET_BOOK=gql`
  query GetBook($getBookId: ID!) {
    getBook(getBookId: $getBookId) {
      _id
      authors
      bookId
      image
      title
      review {
        content
        shared
        username
        _id
      }
      progress
    }
  }
`

// Get an array of all reviews of a book. Requires bookId as argument.
export const GET_BOOK_REVIEWS=gql`
  query BookReviews($bookId: String!) {
    bookReviews(bookId: $bookId) {
      _id
      title
      authors
      image
      review {
        content
        username
        _id
      }
    }
  }
`
// Gets user information by ID. Used for Profile page.
export const GET_USER = gql`
  query getUser($getUserId: ID!) {
    getUser(getUserid: $getUserId) {
      _id
      username
      email
      groups {
        _id
        groupname
        description
      }
      books {
        _id
        title
        authors
        image
        progress
        bookId
      }
    }
  }
`;

// Gets club details by club ID. Used for Club page.
export const GET_CLUB = gql`
  query getClub($clubId: ID!) {
    getClub(clubId: $clubId) {
      _id
      groupname
      description
      users {
        username
        email
        _id
      }
      discussions {
        title
        _id
        image
        authors
        bookId
      }
    }
  }
`;

// Gets all discussions for a club. Used for Club Discussion component.
export const GET_DISCUSSION = gql`
  query getDiscussion($discussionId: ID!) {
    getDiscussion(discussionId: $discussionId) {
      _id
      title
      image
      authors
      bookId
      groupId
      comments {
        commentId
        content
        username
      }
    }
  }
`;

// Gets progress of a specific book by its ID. Used for Book Progress page.
export const GET_BOOK_PROGRESS = gql`
  query getBookProgress($id: ID!) {
    getBook(_id: $id) {
      _id
      title
      authors
      image
      bookId
      progress
    }
  }
`;
