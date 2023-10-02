describe('Isoloated template table - edit', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/templates',
      { fixture: 'templateListResponse.json' }).as('fetchTemplates')
    cy.intercept('GET', '/api/templates/1',
      { fixture: 'templateSingleResponse.json' }).as('fetchTemplate')
    cy.visit('/edit')
    // allow for loading
    cy.get('table tr').should('have.length.above', 1)
  });

  it('Creates a list of the available templates', () => {
    cy.get('th').contains('Template ID')
    cy.get('th').contains('Template Name')
    cy.get('th').contains('Author')
    cy.get('tr').eq(1).contains('1')
    cy.get('tr').eq(2).contains('second template')
    cy.get('tr').eq(2).contains('Anonymous')
  })

  it('clicking on template opens that template for editing', () => {
    cy.get('tr').eq(1).click()
    cy.location('pathname').should('eq', '/templates/1/edit')
    cy.get('input').eq(0).should('have.value', "Hello Template")
    cy.get('input').eq(1).should('have.value', "Fred")
    cy.contains("__, my is name __ but you can call me __.")
  })
})

describe('Template edits', () => {
  beforeEach(() => {
    cy.intercept('PUT', '/api/templates/1/', {}).as('putRequest')
    cy.intercept('DELETE', '/api/templates/1/', {}).as('deleteRequest')
    cy.intercept('GET', '/api/templates/1',
      { fixture: 'templateSingleResponse.json' }).as('getResponseForEdit')
    cy.visit('/templates/1/edit')
  });

  it('submits edited template to backend', () => {
    cy.wait('@getResponseForEdit')
    cy.get('input').eq(0).clear().type('Edited template')
    cy.get('input').eq(1).clear().type('Dan')
    cy.get('textarea').clear().type('This is an __ template.')
    cy.get('[data-cy="submit"]').click()
    cy.wait('@putRequest')
      .its('request.body')
      .should(
        'deep.equal',
        {
          template_name: 'Edited template',
          template_text: 'This is an __ template.',
          template_author: 'Dan'
        }
      );

    cy.get('[data-cy="message"]').contains('Template Edited!')
    cy.get('[data-cy="message"]').should('not.exist')
    cy.location('pathname').should('eq', '/')
  })

  it('sets the author to be Anonymous if blank', () => {
    cy.wait('@getResponseForEdit')
    cy.get('input').eq(1).clear()
    cy.get('[data-cy="submit"]').click()

    cy.wait('@putRequest')
      .its('request.body')
      .should('have.deep.property', 'template_author', 'Anonymous')
  })

  it('can delete a template', () => {
    cy.get('input').eq(0).should('have.value', "Hello Template")
    cy.get('[data-cy="delete"]').click()
    cy.wait('@deleteRequest')
    cy.location('pathname').should('eq', '/')
    cy.get('[data-cy="message"]').contains('Template deleted');
  })
})

describe('Compose Template Errors', () => {
  it('provides an error message for PUT api error', () => {
    cy.intercept('GET', '/api/templates/1',
      { fixture: 'templateSingleResponse.json' }).as('getResponse')
    cy.intercept('PUT', '/api/templates/1',
      {
        statusCode: 404,
        headers: {
          'x-not-found': 'true',
        },
      }).as('badPutRequest');
    cy.visit('/templates/1/edit')
    cy.wait('@getResponse')
    cy.get('form').submit();
    cy.wait('@badPutRequest')

    cy.get('[data-cy="message"]').contains('The template could not be edited at this time');
    cy.get('[data-cy="message"]').should('not.exist');
    cy.location('pathname').should('eq', '/');
  })
  it('handles non-existent template to edit', () => {
    cy.intercept('GET', '/api/templates/1',
      {
        statusCode: 404,
        headers: {
          'x-not-found': 'true',
        },
      });
    cy.visit('/templates/1/edit')
    cy.contains('No such template')
  })
  it('handles directly trying to get non-existant template', () => {
    cy.visit('/templates/311/edit')
    cy.contains('No such template')
  })
})