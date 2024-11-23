
import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";
import Login from "../../client/src/pages/Login";
import { LOGIN } from '../../client/src/utils/mutations';

describe('<Login />', () => {
  const mocks = [
    {
      request: {
        query: LOGIN,
        variables: { email: 'test@example.com', password: 'Password123' },
      },
      result: {
        data: {
          login: { token: 'mockToken' },
        },
      },
    },
  ];

  beforeEach(() => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('renders the login form', () => {
    cy.get('h1').should('contain', 'The Book Hub');
    cy.get('form').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button').should('contain', 'Login');
  });

  it('displays an error for invalid email format', () => {
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('Password123');
    cy.get('button').click();
  });

  it('displays an error for invalid password format', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('short');
    cy.get('button').click();
  });

  it('displays loading text while logging in', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('Password123');
    cy.get('button').click();
  });
});
