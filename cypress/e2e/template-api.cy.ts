describe('Template backend', () => {
  beforeEach(() => {
    cy.request('POST', '/api/templates/',
      {
        template_name: 'first template',
        template_text: 'Hi there', template_author: 'Jim'
      })
  })

  after(() => {
    cy.flushdb().its('code').should('eq', 0);
  })

  it('should respond with json data of new template after POST', () => {
    cy.request('POST', '/api/templates/',
      {
        template_name: 'test',
        template_text: 'test template', template_author: 'tester'
      }).then(
        (response) => {
          expect(response.status).to.be.equal(201);
          expect(response.body).to.have.property('id');
          expect(response.body).to.have.property('template_name', 'test');
          expect(response.body).to.have.property('template_text', 'test template');
          expect(response.body).to.have.property('template_author', 'tester');
        }
      )
  });

  it('should respond with json data of edited template after PUT', () => {
    cy.request('PUT', '/api/templates/1/',
      {
        template_name: 'edited template',
        template_text: 'Go away', template_author: 'Mr. Bean'
      }).then(
        (response) => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.have.property('template_name', 'edited template');
          expect(response.body).to.have.property('template_text', 'Go away');
          expect(response.body).to.have.property('template_author', 'Mr. Bean');
          expect(response.body).to.have.property('id');
        }
      )
  });

  it('should respond with json data of templates', () => {
    cy.request('GET', '/api/templates/').then(
      (response) => {
        expect(response.status).to.be.equal(200);
        const result = response.body.map((
          { template_name, template_text, template_author }
        ) => ({ template_name, template_text, template_author }))
        expect(result).to.deep.include(
          {
            template_name: 'first template',
            template_text: 'Hi there', template_author: 'Jim'
          })
      }
    )
  });

  it('should delete a template', () => {
    cy.request('DELETE', '/api/templates/1/').then(
      (response) => {
        expect(response.status).to.be.equal(204);
      }
    )
  })
});