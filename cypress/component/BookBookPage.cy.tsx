import React from 'react'
import BookPage from '../../client/src/pages/Book'

describe('<BookPage />', () => {
  it('renders', () => {
    cy.mount(<BookPage />)
  })
})