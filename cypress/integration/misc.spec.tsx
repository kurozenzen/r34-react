describe('misc', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/r34-react/#/').as('loadPage')
  })

  it('changes random tip', () => {
    cy.findByRole('note').then((tip) => {
      const textContent = tip.text()

      cy.findByRole('note').click()
      cy.findByRole('note').should('not.have.text', textContent)
    })
  })

  it('')
})
