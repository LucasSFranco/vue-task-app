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

const tasks = [
  { completed: true, description: chance.string(), timestamp: chance.date() },
  { completed: false, description: chance.string(), timestamp: chance.date() },
  { completed: chance.bool(), description: chance.string(), timestamp: chance.date() },
  { completed: chance.bool(), description: chance.string(), timestamp: chance.date() },
  { completed: chance.bool(), description: chance.string(), timestamp: chance.date() },
];

describe('TASK LIST', () => {
  beforeEach(() => {
    db.tasks.clear();
    cy.visit('http://localhost:8080/');
  });

  it('renders skeleton when loading', () => {
    cy.get('.skeleton-of-task')
      .should('be.visible')
  });

  it('renders empty component', () => {
    cy.get('.task')
      .should('not.exist');

    cy.get('.empty')
      .should('be.visible')
  });

  context('when populated', () => {
    beforeEach(() => {
      db.tasks.clear();

      tasks.map(async (task) => {
        await db.tasks.add(task);
      });
    });

    it('properly renders tasks', () => {
      cy.get('.task')
        .should('have.length', 5);
    });

    it('properly renders completed tasks', () => {
      const completedTasks = tasks.filter((task) => task.completed);

      cy.get('.task.completed')
        .should('have.length', completedTasks.length);
    });

    it('marks task as complete', () => {
      const completedTasks = tasks.filter((task) => task.completed);

      cy.get('.task')
        .not('.completed')
        .first().within(() => {
          cy.get('button.toggle-task-completion')
            .click();
        });

      cy.get('.task.completed')
        .should('have.length', completedTasks.length + 1);
    });

    it('marks task as pending', () => {
      const completedTasks = tasks.filter((task) => task.completed);

      cy.get('.task.completed')
        .first().within(() => {
          cy.get('button.toggle-task-completion')
            .click();
        });

      cy.get('.task.completed')
        .should('have.length', completedTasks.length - 1);
    });

    it('deletes task', () => {
      cy.get('.task')
        .first().within(() => {
          cy.get('button.delete-task')
            .click();
        });

      cy.get('.task')
        .should('have.length', tasks.length - 1);
    });
  });
});
