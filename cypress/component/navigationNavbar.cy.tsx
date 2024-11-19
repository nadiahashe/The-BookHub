import React from 'react'
import Navbar from '../../client/src/components/navigation';

describe('<Navbar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Navbar />)
  });
});