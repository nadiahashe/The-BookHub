import React from 'react'
import Navbar from "../../client/src/components/navigation"

describe('<Navbar />', () => {
  it('renders', () => {
    cy.mount(<Navbar />)
  });
});