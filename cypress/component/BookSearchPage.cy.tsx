
import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import BookSearchPage from '../../client/src/pages/BookSearch';
import { GET_ME } from '../../client/src/utils/queries';
import { GOOGLE_BOOK_SEARCH, ADD_BOOK } from '../../client/src/utils/mutations';

const mockUserData = {
  request: {
    query: GET_ME,
  },
  result: {
    data: {
      me: {
        _id: 'user1',
        books: [
          { bookId: 'book1', title: 'Book One' },
        ],
      },
    },
  },
};

const mockSearchResults = {
  request: {
    query: GOOGLE_BOOK_SEARCH,
    variables: { string: 'test search' },
  },
  result: {
    data: {
      bookSearch: [
        { bookId: 'book2', title: 'Book Two', authors: ['Author A'], image: 'book2.jpg' },
        { bookId: 'book3', title: 'Book Three', authors: ['Author B'], image: 'book3.jpg' },
      ],
    },
  },
};

const mockAddBook = {
  request: {
    query: ADD_BOOK,
    variables: { title: 'Book Two', authors: ['Author A'], image: 'book2.jpg', bookId: 'book2' },
  },
  result: {
    data: {
      addBook: {
        _id: 'book2',
        title: 'Book Two',
      },
    },
  },
};

// Test Suite
describe('BookSearchPage Component Tests', () => {
  it('renders the search form correctly', () => {
    mount(
      <MockedProvider mocks={[mockUserData]} addTypename={false}>
        <MemoryRouter>
          <BookSearchPage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.get('input[type="text"]').should('exist');
    cy.contains('Search for books').should('exist');
  });

  it('displays search results', () => {
    mount(
      <MockedProvider mocks={[mockUserData, mockSearchResults]} addTypename={false}>
        <MemoryRouter>
          <BookSearchPage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.get('input[type="text"]').type('test search');
    cy.contains('Search for books').click();

    cy.contains('Book Two by Author A').should('be.visible');
    cy.contains('Book Three by Author B').should('be.visible');
    cy.get('img[alt="Cover for Book Two"]').should('exist');
    cy.get('img[alt="Cover for Book Three"]').should('exist');
  });

  it('handles adding a book to the collection', () => {
    mount(
      <MockedProvider mocks={[mockUserData, mockSearchResults, mockAddBook]} addTypename={false}>
        <MemoryRouter>
          <BookSearchPage />
        </MemoryRouter>
      </MockedProvider>
    );


    cy.get('input[type="text"]').type('test search');
    cy.contains('Search for books').click();

    cy.contains('Book Two by Author A').should('be.visible');
    cy.contains('Add to collection').click();
  });

  it('displays "no results found" message', () => {
    const mockNoResults = {
      request: {
        query: GOOGLE_BOOK_SEARCH,
        variables: { string: 'no results' },
      },
      result: {
        data: {
          bookSearch: [],
        },
      },
    };

    mount(
      <MockedProvider mocks={[mockUserData, mockNoResults]} addTypename={false}>
        <MemoryRouter>
          <BookSearchPage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.get('input[type="text"]').type('no results');
    cy.contains('Search for books').click();
    cy.contains('No results found').should('be.visible');
  });
});
