
import { MockedProvider } from '@apollo/client/testing';
import { mount } from "cypress/react18";
import SignupForm from '../../client/src/pages/SignUp';
import { SIGNUP } from '../../client/src/utils/mutations';

const mockSignUp = {
  request: {
    query: SIGNUP,
    variables: { username: 'testuser', password: 'Password123', email: 'testuser@example.com' },
  },
  result: {
    data: {
      signup: {
        token: 'mock-token',
      },
    },
  },
};

describe('SignupForm Component Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    mount(
      <MockedProvider mocks={[mockSignUp]} addTypename={false}>
        <SignupForm />
      </MockedProvider>
    );
  });

  it('renders the sign-up form correctly', () => {
    cy.contains('Wander In, Bookworm – Glad You\'re Here!').should('be.visible');
    cy.get('input#username').should('exist');
    cy.get('input#email').should('exist');
    cy.get('input#password').should('exist');
    cy.get('button#signup-btn').should('exist');
  });

  it('validates email format', () => {
    cy.get('input#email').type('invalid-email');
    cy.get('button#signup-btn').click();
  });

  it('validates password strength', () => {
    cy.get('input#password').type('weak');
    cy.get('button#signup-btn').click();
  });

  it('submits the form and logs in the user', () => {
    cy.get('input#username').type('testuser');
    cy.get('input#email').type('testuser@example.com');
    cy.get('input#password').type('Password123');
    cy.get('button#signup-btn').click();
  });
});
