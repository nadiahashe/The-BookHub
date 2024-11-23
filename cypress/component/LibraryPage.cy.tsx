
import { MockedProvider } from '@apollo/client/testing';
import { mount } from "cypress/react18";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LibraryPage from '../../client/src/pages/Library';
import { GET_ME } from '../../client/src/utils/queries';
import { REMOVE_BOOK } from '../../client/src/utils/mutations';

const mockUserWithBooks = {
  request: {
    query: GET_ME,
  },
  result: {
    data: {
      me: {
        _id: 'user1',
        books: [
          { _id: 'book1', title: 'Book One', authors: ['Author A'], progress: 50, image: 'book1.jpg' },
          { _id: 'book2', title: 'Book Two', authors: ['Author B'], progress: 70, image: 'book2.jpg' },
        ],
      },
    },
  },
};

const mockUserWithoutBooks = {
  request: {
    query: GET_ME,
  },
  result: {
    data: {
      me: {
        _id: 'user1',
        books: [],
      },
    },
  },
};

const mockRemoveBook = {
  request: {
    query: REMOVE_BOOK,
    variables: { bookId: 'book1' },
  },
  result: {
    data: {
      removeBook: {
        success: true,
      },
    },
  },
};

// Test Suite
describe('LibraryPage Component Tests', () => {
  it('renders books in the user\'s library', () => {
    mount(
      <MockedProvider mocks={[mockUserWithBooks]} addTypename={false}>
        <MemoryRouter initialEntries={['/library']}>
          <Routes>
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Welcome to Your Library').should('be.visible');
    cy.contains('Book One').should('be.visible');
    cy.contains('Author A').should('be.visible');
    // cy.contains('Progress: 50%').should('be.visible');

    cy.contains('Book Two').should('be.visible');
    cy.contains('Author B').should('be.visible');
    // cy.contains('Progress: 70%').should('be.visible');
  });

  it('shows "no books found" message when the library is empty', () => {
    mount(
      <MockedProvider mocks={[mockUserWithoutBooks]} addTypename={false}>
        <MemoryRouter initialEntries={['/library']}>
          <Routes>
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('No books found. Add some books to your library').should('be.visible');
  });

  it('removes a book from the library', () => {
    const mocks = [mockUserWithBooks, mockRemoveBook];

    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/library']}>
          <Routes>
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Book One').should('be.visible');
    cy.get('svg').first().click();
    cy.on('window:confirm', () => true);

    cy.contains('Book One').should('not.exist');
  });
});
