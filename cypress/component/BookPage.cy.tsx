
import React from 'react';
import { mount } from 'cypress/react18';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BookPage from "../../client/src/pages/Book"
import { GET_BOOK } from '../../client/src/utils/queries';
import { UPDATE_BOOK_PROGRESS, UPDATE_REVIEW } from '../../client/src/utils/mutations';

describe('<BookPage />', () => {
  const mockBookData = {
    getBook: {
      _id: '1',
      title: 'Test Book',
      authors: ['Author One', 'Author Two'],
      image: 'http://example.com/book-cover.jpg',
      progress: 50,
      review: {
        content: 'Great book so far!',
        shared: false,
      },
    },
  };

  const mocks = [
    {
      request: {
        query: GET_BOOK,
        variables: { getBookId: '1' },
      },
      result: {
        data: mockBookData,
      },
    },
    {
      request: {
        query: UPDATE_BOOK_PROGRESS,
        variables: { progress: 60, bookId: '1' },
      },
      result: {
        data: { updateProgress: { progress: 60 } },
      },
    },
    {
      request: {
        query: UPDATE_REVIEW,
        variables: { shared: true, content: 'Fantastic read!', id: '1' },
      },
      result: {
        data: { updateReview: { content: 'Fantastic read!', shared: true } },
      },
    },
  ];

  beforeEach(() => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/book/1']}>
          <Routes>
            <Route path="/book/:id" element={<BookPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('renders loading state initially', () => {
    cy.contains('Loading...').should('be.visible');
  });

  it('renders book data after loading', () => {
    cy.contains('Test Book').should('be.visible');
    cy.contains('By: Author One, Author Two').should('be.visible');
    cy.contains('Current Progress: 50%').should('be.visible');
    cy.contains('Great book so far!').should('be.visible');
  });

  it('shows error message if there is an error', () => {
    const errorMocks = [
      {
        request: {
          query: GET_BOOK,
          variables: { getBookId: '1' },
        },
        error: new Error('Error fetching book data'),
      },
    ];

    mount(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter initialEntries={['/book/1']}>
          <Routes>
            <Route path="/book/:id" element={<BookPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Error loading book: Error fetching book data').should('be.visible');
  });


  it('toggles shared thoughts checkbox', () => {
    cy.contains('Update thoughts?').click();
    cy.get('textarea[name="thoughts"]').type('Great insights!');
    cy.get('input[type="checkbox"]').check();
  });
});
