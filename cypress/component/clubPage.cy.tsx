
import React from 'react';
import { mount } from 'cypress/react18';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ClubPage from "../../client/src/pages/ClubPage"
import { GET_CLUB } from '../../client/src/utils/queries';
import { ADD_USER_TO_GROUP } from '../../client/src/utils/mutations';

describe('<ClubPage />', () => {
  const mockClubData = {
    getClub: {
      _id: '1',
      groupname: 'Test Club',
      description: 'A club for testing.',
      users: [{ _id: '1', username: 'testuser1' }, { _id: '2', username: 'testuser2' }],
      discussions: [
        { _id: '1', title: 'Discussion 1', authors: ['author1', 'author2'] },
        { _id: '2', title: 'Discussion 2', authors: [] },
      ],
    },
  };

  const mocks = [
    {
      request: {
        query: GET_CLUB,
        variables: { clubId: '1' },
      },
      result: {
        data: mockClubData,
      },
    },
    {
      request: {
        query: ADD_USER_TO_GROUP,
        variables: { username: 'newUser', groupId: '1' },
      },
      result: {
        data: { addUserToGroup: { _id: '3', username: 'newUser' } },
      },
    },
  ];

  beforeEach(() => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/club/1']}>
          <Routes>
            <Route path="/club/:id" element={<ClubPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('renders loading state initially', () => {
    cy.contains('Loading...').should('be.visible');
  });

  it('renders club data after loading', () => {
    cy.contains('Test Club').should('be.visible');
    cy.contains('A club for testing.').should('be.visible');
    cy.contains('Members').should('be.visible');
    cy.contains('testuser1').should('be.visible');
    cy.contains('testuser2').should('be.visible');
    cy.contains('Discussions').should('be.visible');
    cy.contains('Discussion 1').should('be.visible');
    cy.contains('Discussion 2').should('be.visible');
  });

  it('shows error message if there is an error', () => {
    const errorMocks = [
      {
        request: {
          query: GET_CLUB,
          variables: { clubId: '1' },
        },
        error: new Error('Error fetching club data'),
      },
    ];

    mount(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter initialEntries={['/club/1']}>
          <Routes>
            <Route path="/club/:id" element={<ClubPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Error loading club: Error fetching club data').should('be.visible');
 
      });
  });
