describe('tag handling', () => {
  before(() => {
    // copied from devtools
    cy.intercept(
      {
        method: 'GET',
        url: 'https://r34-json.herokuapp.com/v2/tags?limit=20&name=s&sort=count',
      },
      [{ count: 79, name: 's', types: ['character', 'ambiguous'] }]
    ).as('getTags1')
    cy.intercept(
      {
        method: 'GET',
        url: 'https://r34-json.herokuapp.com/v2/tags?limit=20&name=sa&sort=count',
      },
      [{ count: 2, name: 'sa', types: ['artist'] }]
    ).as('getTags2')
    cy.intercept(
      {
        method: 'GET',
        url: 'https://r34-json.herokuapp.com/v2/tags?limit=20&name=saf&sort=count',
      },
      [{ count: 10, name: 'saf', types: ['artist'] }]
    ).as('getTags3')
    cy.intercept(
      {
        method: 'GET',
        url: 'https://r34-json.herokuapp.com/v2/tags?limit=20&name=*safe*&sort=count',
      },
      [
        { count: 400, name: 'safe_sex', types: ['general'] },
        { count: 337, name: 'not_safe_for_reality', types: ['artist'] },
        { count: 226, name: 'mr_safety', types: ['artist'] },
        { count: 195, name: 'notsafeforfruit', types: ['artist'] },
        { count: 156, name: 'safe', types: ['general'] },
        { count: 130, name: 'safety_pin', types: ['general'] },
        { count: 112, name: 'notsafeforhoofs', types: ['artist'] },
        { count: 64, name: 'safe_vore', types: ['general'] },
        { count: 61, name: 'mrsafetylion', types: ['artist'] },
        { count: 38, name: 'safewordignored', types: ['artist'] },
        { count: 24, name: 'lou_and_lou_safety_patrol', types: ['copyright'] },
        { count: 24, name: 'notsafebear', types: ['general'] },
        { count: 21, name: 'safety_goggles', types: ['general'] },
        { count: 21, name: 'safety_mom', types: ['character'] },
        { count: 20, name: 'notsafeforweh', types: ['artist'] },
        { count: 19, name: 'failsafe', types: ['character'] },
        { count: 18, name: 'safemode', types: ['artist'] },
        { count: 17, name: 'rosafelix', types: ['artist'] },
        { count: 16, name: 'nozsafeforwork', types: ['artist'] },
        { count: 16, name: 'knotsafefurrwork', types: ['artist'] },
      ]
    ).as('getTags4')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/r34-react/#/').as('loadPage')
  })

  it('add and remove tag', () => {
    cy.findByRole('textbox').type('s')
    cy.wait('@getTags1')
    cy.findByRole('list').findAllByRole('listitem').should('have.length', 6) // additional suggestions from static tags

    cy.findByRole('textbox').type('a')
    cy.wait('@getTags2')
    cy.findByRole('list').findAllByRole('listitem').should('have.length', 2) // additional suggestions from static tags

    cy.findByRole('textbox').type('f')
    cy.wait('@getTags3')
    cy.findByRole('list').findAllByRole('listitem').should('have.length', 2) // additional suggestions from static tags

    cy.findByRole('textbox').type('e')
    cy.wait('@getTags4')
    cy.findByRole('list').findAllByRole('listitem').should('have.length', 21) // additional suggestions from static tags

    cy.findAllByRole('listitem').first().click()

    cy.findByText('safe (14K)').should('exist')

    cy.findByText('safe (14K)').click()

    cy.findByRole('listitem').should('not.exist')
  })

  it('cycle modifier', () => {
    cy.findByText('+').should('exist')
    cy.findByText('+').click()
    cy.findByText('-').should('exist')
    cy.findByText('-').click()
    cy.findByText('~').should('exist')
    cy.findByText('~').click()
    cy.findByText('+').should('exist')
  })

  it('toggle and configure popular posts', () => {
    cy.findByText('More than').should('not.exist')
    cy.findByRole('checkbox').click()
    cy.findByText('More than').should('exist')
    cy.get('input[type="number"]').type('200')
    cy.findByRole('checkbox').click()
    cy.findByText('More than').should('not.exist')
  })

  it('toggle sort', () => {
    cy.findByRole('combobox').should('have.value', 'date')
    cy.findByRole('combobox').select('Score')
    cy.findByRole('combobox').should('have.value', 'score')
    cy.findByRole('combobox').select('Date')
    cy.findByRole('combobox').should('have.value', 'date')
  })
})
