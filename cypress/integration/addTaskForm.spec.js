/* eslint-disable */

import Dexie from 'dexie';
import 'dexie-observable';

import Chance from 'chance';

const db = new Dexie('vue-task-app-2.0');

db.version(1).stores({
  tasks: '++id, completed, description, timestamp',
});

db.open();

const chance = new Chance();

describe('ADD TASK FORM', () => {
  beforeEach(() => {
    db.tasks.clear();
    cy.visit('http://localhost:8080/');
  });

  it('is hidden on load', () => {
    cy.get('.add-task-form')
      .should('not.be.visible');
  });

  context('opens', () => {
    it('on toggle button click', () => {
      cy.get('button.add-task')
        .click();

      cy.get('.add-task-form')
        .should('be.visible');
    });

    it('on ENTER key press', () => {
      cy.get('body')
        .type('{enter}');

      cy.get('.add-task-form')
        .should('be.visible');
    });

    afterEach(() => {
      cy.log('focuses textarea');

      cy.focused()
        .should('have.class', 'textarea');
    });
  });

  context('when visible', () => {
    beforeEach(() => {
      cy.get('button.add-task')
        .click();
    });

    context('closes', () => {
      it('on toggle button click', () => {
        cy.get('button.add-task')
          .click();

        cy.get('.add-task-form')
          .should('not.be.visible');
      });

      it('on ESC key press', () => {
        cy.get('body')
          .type('{esc}');

        cy.get('.add-task-form')
          .should('not.be.visible');
      });

      it('on ENTER key press', () => {
        cy.get('body')
          .type('{enter}');

        cy.get('.add-task-form')
          .should('not.be.visible');
      });

      it('on cancel button click', () => {
        cy.get('.add-task-form')
          .contains('cancel')
          .click();

        cy.get('.add-task-form')
          .should('not.be.visible');
      });

      afterEach(() => {
        cy.log('cleans textarea');

        cy.get('.textarea')
          .should('contain', '');
      });
    });

    it('accepts input', () => {
      const typedText = chance.string();

      cy.get('.add-task-form')
        .type(typedText)
        .should('contain', typedText);
    });

    context('submits', () => {
      const typedText = chance.string();

      beforeEach(() => {
        cy.get('.textarea')
          .type(typedText);
      });

      it('on save button click', () => {
        cy.get('.add-task-form')
          .contains('save')
          .click();
      });

      it('on ENTER key press', () => {
        cy.get('body')
          .type('{enter}');
      });

      afterEach(() => {
        cy.log('properly adds to database');
        cy.get('.task')
          .should('have.length', 1)
          .should('contain', typedText);

        cy.log('closes itself');
        cy.get('.add-task-form')
          .should('not.be.visible');

        cy.log('cleans textarea');
        cy.get('.textarea')
          .should('contain', '');
      });
    });
  });
});
