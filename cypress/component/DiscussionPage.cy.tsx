
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mount } from "cypress/react18";
import DiscussionPage from '../../client/src/pages/DiscussionPage';
import { GET_DISCUSSION } from '../../client/src/utils/queries';
import { CREATE_COMMENT } from '../../client/src/utils/mutations';

const mockDiscussionData = {
  request: {
    query: GET_DISCUSSION,
    variables: { discussionId: 'test-discussion-id' },
  },
  result: {
    data: {
      getDiscussion: {
        title: 'Test Discussion',
        authors: ['Author A', 'Author B'],
        image: 'test-image-url',
        comments: [
          { commentId: '1', username: 'user1', content: 'Great discussion!' },
          { commentId: '2', username: 'user2', content: 'I love this book!' },
        ],
      },
    },
  },
};

const mockCreateComment = {
  request: {
    query: CREATE_COMMENT,
    variables: {
      discussionId: 'test-discussion-id',
      content: 'New Comment',
      username: 'testUser',
    },
  },
  result: { data: { createComment: { success: true } } },
};

describe('DiscussionPage Component Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    mount(
      <MockedProvider mocks={[mockDiscussionData, mockCreateComment]} addTypename={false}>
        <MemoryRouter initialEntries={['/discussion/test-discussion-id']}>
          <Routes>
            <Route path="/discussion/:id" element={<DiscussionPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('renders loading state', () => {
    cy.contains('Loading...').should('be.visible');
  });

  it('displays discussion data', () => {
    cy.contains('Test Discussion').should('be.visible');
    cy.contains('By: Author A, Author B').should('be.visible');
    cy.get('.book-image').should('have.attr', 'src', 'test-image-url');
  });

  it('displays comments correctly', () => {
    cy.contains('user1 : Great discussion!').should('be.visible');
    cy.contains('user2 : I love this book!').should('be.visible');
  });

  it('adds a new comment', () => {
    cy.get('textarea.commentText')
      .type('New Comment')
      .should('have.value', 'New Comment');
    cy.get('button.comment-btn').click();

    cy.get('textarea.commentText').should('have.value', '');
  });

  it('does not allow adding empty comments', () => {
    cy.get('button.comment-btn').click();
    cy.get('textarea.commentText').should('have.value', ''); 
    cy.contains('New Comment').should('not.exist');
  });
});
