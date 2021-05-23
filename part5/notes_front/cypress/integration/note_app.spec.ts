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
});

export {};
