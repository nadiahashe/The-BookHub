import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mount } from "cypress/react18";
import ClubPage from '../../client/src/pages/ClubPage';
import { GET_CLUB } from '../../client/src/utils/queries';
import { ADD_USER_TO_GROUP, REMOVE_USER_FROM_GROUP } from '../../client/src/utils/mutations';

// Mock Data
const mockClubData = {
  request: {
    query: GET_CLUB,
    variables: { clubId: 'test-club-id' },
  },
  result: {
    data: {
      getClub: {
        groupname: 'Test Club',
        description: 'A test club for book lovers',
        users: [
          { _id: '1', username: 'testuser1' },
          { _id: '2', username: 'testuser2' },
        ],
        discussions: [
          { _id: '1', title: 'Discussion 1', authors: ['Author A'] },
          { _id: '2', title: 'Discussion 2', authors: ['Author B'] },
        ],
      },
    },
  },
};

// Mock Mutation Responses
const addUserMock = {
  request: {
    query: ADD_USER_TO_GROUP,
    variables: { username: 'newUser', groupId: 'test-club-id' },
  },
  result: { data: { addUserToGroup: { success: true } } },
};

const removeUserMock = {
  request: {
    query: REMOVE_USER_FROM_GROUP,
    variables: { groupId: 'test-club-id' },
  },
  result: { data: { removeUserFromGroup: { success: true } } },
};

// Test Suite
describe('ClubPage Component Tests', () => {
  const mocks = [mockClubData, addUserMock, removeUserMock];

  beforeEach(() => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/club/test-club-id']}>
          <Routes>
            <Route path="/club/:id" element={<ClubPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('renders club information correctly', () => {
    cy.contains('Welcome to your Club: Test Club').should('be.visible');
    cy.contains('A test club for book lovers').should('be.visible');
  });

  it('displays members list when "Show Members" is clicked', () => {
    cy.contains('Show Members').click();
    cy.contains('testuser1').should('be.visible');
    cy.contains('testuser2').should('be.visible');
  });
});
