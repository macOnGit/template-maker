describe('Isolated Compose Template', () => {
  // https://docs.cypress.io/examples/examples/tutorials#Best-Practices
  beforeEach(() => {
    cy.intercept('POST', '/api/templates/',
      { fixture: 'templateCreateResponse.json' }).as('createTemplate');
    cy.visit('/compose');
  });

  it('does not have delete button', () => {
    cy.get('[data-cy="delete"]').should('not.exist');
  })

  it('Submits a template', () => {
    // add name to form
    cy.get('[data-cy="template-name"]').type('my new template');

    // add template text to form
    cy.get('[data-cy="template-text"]').type('Hi, my name is __.');

    // add template author
    cy.get('[data-cy="template-author"]').type('john doe')

    // click save
    cy.get('form').submit();

    // wait for response
    cy.wait('@createTemplate')
      .its('request.body')
      .should(
        'deep.equal',
        {
          template_name: 'my new template',
          template_text: 'Hi, my name is __.',
          template_author: 'john doe',
        }
      );

    cy.get('[data-cy="message"]').contains('Template Created!');
    cy.get('[data-cy="message"]').should('not.exist');
    cy.location('pathname').should('eq', '/');
  });

  it('sets the author to be Anonymous if blank', () => {
    cy.get('[data-cy="template-name"]').type('my new template');
    cy.get('[data-cy="template-text"]').type('Hi, my name is __.');
    cy.get('form').submit();

    // wait for response
    cy.wait('@createTemplate')
      .its('request.body')
      .should('have.deep.property', 'template_author', 'Anonymous');
  })
});

describe('Compose Template Errors', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/templates/',
      {
        statusCode: 404,
        headers: {
          'x-not-found': 'true',
        },
      });
    cy.visit('/compose');
  });

  it('provides an error message for api error', () => {
    cy.get('[data-cy="template-name"]').type('my new template');
    cy.get('[data-cy="template-text"]').type('Hi, my name is __.');
    cy.get('form').submit();

    cy.get('[data-cy="message"]').contains('A Template could not be created at this time');
    cy.get('[data-cy="message"]').should('not.exist');
    cy.location('pathname').should('eq', '/');
  });
})