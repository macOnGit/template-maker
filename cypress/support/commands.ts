/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('flushdb', () => {
  cy.exec("npm run flushdb")
})

// TODO: maybe this is a fix for "Couldn't find tsconfig.json. tsconfig-paths will be skipped"?
// https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#tsconfig-bases
// https://github.com/tsconfig/bases/#cypress-tsconfigjson
export { };

declare global {
  namespace Cypress {
    interface Chainable {
      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      /**
       * Custom command to flush backend database
       * @example cy.flushdb
       */
      flushdb(): Chainable<void>
    }
  }
}