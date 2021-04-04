/* eslint-disable */

import Chance from 'chance';

const chance = new Chance();

describe('Add task form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('is invisible on load', () => {
    cy.get('.add-task-form')
      .should('not.be.visible');
  });

  it('opens on toggle button click', () => {
    cy.get('button.add-task')
      .click();

    cy.get('.add-task-form')
      .should('be.visible');
  });

  it('opens on Enter key press', () => {
    cy.get('body')
      .type('{enter}');

    cy.get('.add-task-form')
      .should('be.visible');
  });

  context('is visible', () => {
    beforeEach(() => {
      cy.get('button.add-task')
        .click();
    });

    it('focuses on open', () => {
      cy.focused()
        .should('have.class', 'textarea');
    });

    it('closes on toggle button click', () => {
      cy.get('button.add-task')
        .click();

      cy.get('.add-task-form')
        .should('not.be.visible');
    });

    it('closes on Esc key press', () => {
      cy.get('body')
        .type('{esc}');

      cy.get('.add-task-form')
        .should('not.be.visible');
    });

    it('accepts input', () => {
      const typedText = chance.string();

      cy.get('.add-task-form')
        .type(typedText)
        .should('contain', typedText);
    });

    it('closes on cancel button click', () => {
      cy.get('.add-task-form')
        .contains('cancel')
        .click();

      cy.get('.add-task-form')
        .should('not.be.visible');
    });

    it.only('submit', () => {
      const typedText = chance.string();

      cy.get('.add-task-form')
        .type(typedText)

      cy.get('.add-task-form')
        .contains('save')
        .click();
    });
  });
});
