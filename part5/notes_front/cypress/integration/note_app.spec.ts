describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2021'
    );
  });

  it('user can login', function () {
    cy.contains('login').click();
    cy.get('input#username').type('mluukkai');
    cy.get('input#password').type('salainen');
    cy.get('#login-button').click();

    cy.contains('Matti Luukkainen logged-in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('input#username').type('mluukkai');
      cy.get('input#password').type('salainen');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input#newNote').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });
  });
});

export {};
