describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('Gives a welcome message with instructions', () => {
    cy.get('h1').contains('Welcome')
    cy.contains('Click Compose to create')
  });

  it('Has working links - home', () => {
    cy.visit('/compose')
    cy.get('[data-cy="home"]').click()
    cy.location('pathname').should('eq', '/')
  })

  it('Has working links - compose', () => {
    cy.get('[data-cy="compose"]').click()
    cy.location('pathname').should('eq', '/compose')
  })

  it('Has working links - templates', () => {
    cy.get('[data-cy="templates"]').click()
    cy.location('pathname').should('eq', '/templates')
  })

  it('Has working links - edit templates', () => {
    cy.get('[data-cy="edit"]').click()
    cy.location('pathname').should('eq', '/edit')
  })
})

describe('Unknown page', () => {
  it('returns nonfound page', () => {
    cy.visit('/not-a-page')
    cy.contains('No such page')
  })
})