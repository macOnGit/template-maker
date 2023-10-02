describe('Template Composition', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/templates/1',
      { fixture: 'templateSingleResponse.json' })
    cy.visit('/templates/1')
    cy.get('button[type=submit]').as('submitBtn')
  });

  it('creates a compilation of the static text and fields', () => {
    cy.get('form').within(() => {
      cy.get('input').eq(0).type('Dave')
      cy.get('input').eq(1).type('John')
      cy.get('input').eq(2).type('Tom')
    })
    cy.get('@submitBtn').click()
    cy.location('pathname').should('eq', '/compiled');
    cy.contains("Dave, my is name John but you can call me Tom.")
  })

  it('clears the field on focus', () => {
    cy.get('input')
      .first()
      .focus()
      .should('have.value', '')
  })

  it('adds __ back to empty field on focus loss', () => {
    cy.get('input')
      .first()
      .focus()
      .blur()
      .should('have.value', '__')
  })
})