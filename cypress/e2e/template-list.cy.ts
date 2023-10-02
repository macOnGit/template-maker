describe('Isoloated template table - use', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/templates',
      { fixture: 'templateListResponse.json' })
    cy.intercept('GET', '/api/templates/1',
      { fixture: 'templateSingleResponse.json' })
    cy.visit('/templates')
  });

  it('Creates a list of the available templates', () => {
    // allow for loading
    cy.get('table tr').should('have.length.above', 1)
    cy.get('tr').eq(1).contains('1')
    cy.get('tr').eq(2).contains('second template')
  })

  it('clicking on template opens that template', () => {
    cy.get('table tr').should('have.length.above', 1)
    cy.get('tr').eq(1).click()
    cy.location('pathname').should('eq', '/templates/1')
    cy.contains("Hello Template")
    cy.contains("__, my is name __ but you can call me __.")
    cy.contains('field 1')
    cy.contains('field 2')
    cy.contains('field 3')
  })

  it('does not crash if no underscores', () => {
    cy.intercept('GET', '/api/templates/1',
      {
        "id": 1,
        "template_name": "Empty",
        "template_text": "No fields"
      }
    )
    cy.visit('/templates/1')
    cy.contains('Empty')
    cy.contains('No fields')
  })
})

describe('Template table errors', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/templates/404',
      {
        statusCode: 404,
        headers: {
          'x-not-found': 'true',
        },
      });
    cy.intercept('POST', '/api/logger', {
      statusCode: 200
    }).as('logRequest')
    cy.visit('/templates/404')
  })

  it('toasts user with error message', () => {
    cy.contains('No such template')
  })

  it('sends a log of the error with data', () => {
    cy.wait('@logRequest')
      .its('request.body.logs')
      .its(0)
      .its('message')
      .should('contain', 'No such template')
    // TODO: make sure route actually exists too!
  })
})