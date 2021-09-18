describe('navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/r34-react/#/').as('loadPage')
  })

  it('to preferences', () => {
    cy.findByText('Preferences').click()
    cy.findByText('General').should('exist')
  })

  it('to about', () => {
    cy.findByText('About').click()
    cy.findByText('The App').should('exist')
  })
})
