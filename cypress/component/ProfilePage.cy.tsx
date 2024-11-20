
import React from 'react';
import { mount } from 'cypress/react18';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from "../../client/src/pages/ProfilePage"
import { GET_ME } from '../../client/src/utils/queries';

describe('<ProfilePage />', () => {
  const mockUserData = {
    me: {
      username: 'testuser',
      books: [
        {
          _id: '1',
          title: 'Test Book 1',
          authors: ['Author 1'],
          progress: 50,
          image: 'http://example.com/book1-cover.jpg',
        },
        {
          _id: '2',
          title: 'Test Book 2',
          authors: ['Author 2'],
          progress: 75,
          image: 'http://example.com/book2-cover.jpg',
        },
      ],
      groups: [
        {
          _id: '1',
          groupname: 'Test Club 1',
          description: 'A test club description',
        },
        {
          _id: '2',
          groupname: 'Test Club 2',
          description: 'Another test club description',
        },
      ],
    },
  };

  const mocks = [
    {
      request: {
        query: GET_ME,
      },
      result: {
        data: mockUserData,
      },
    },
  ];

  beforeEach(() => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('renders loading state initially', () => {
    cy.contains('Loading profile...').should('be.visible');
  });

  it('renders error state if query fails', () => {
    const errorMocks = [
      {
        request: {
          query: GET_ME,
        },
        error: new Error('Error fetching profile data'),
      },
    ];

    mount(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Error loading profile: Error fetching profile data').should('be.visible');
  });

  it('renders user profile after loading', () => {
    cy.contains('Welcome, testuser').should('be.visible');
    cy.contains('My Books').should('be.visible');
    cy.contains('My Clubs').should('be.visible');
  });

  it('displays books with progress and links', () => {
    cy.contains('Test Book 1').should('be.visible');
    cy.contains('Progress: 50%').should('be.visible');
    cy.get('a[href="/book/1"]').should('exist');

    cy.contains('Test Book 2').should('be.visible');
    cy.contains('Progress: 75%').should('be.visible');
    cy.get('a[href="/book/2"]').should('exist');
  });

  it('displays clubs with names and links', () => {
    cy.contains('Test Club 1').should('be.visible');
    cy.get('a[href="/club/1"]').should('exist');

    cy.contains('Test Club 2').should('be.visible');
    cy.get('a[href="/club/2"]').should('exist');
  });

  it('opens profile picture editor modal', () => {
    cy.get('.edit-button').click();
    cy.contains('Profile Picture Editor').should('be.visible');
  });

  it('closes profile picture editor modal on cancel', () => {
    cy.get('.edit-button').click();
    cy.get('.modal-header button').click();
    cy.contains('Profile Picture Editor').should('not.exist');
 
     });
  });

