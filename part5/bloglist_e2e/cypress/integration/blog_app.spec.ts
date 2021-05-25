describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {username: 'poc', name: 'Poc Sleepy', password: 'password'}
    cy.request('POST', 'http://localhost:3003/api/users', user).then(result => {
      console.log(result.body);
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('button').contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('poc');
      cy.get('#password').type('password');
      cy.get('#login_button').click();
      cy.contains('Poc Sleepy logged in.');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('poc');
      cy.get('#password').type('wrong');
      cy.get('#login_button').click();
      cy.should('not.contain', 'Poc Sleepy logged in.');
      cy.get('#error_alert')
        .should('contain','invalid username or password')
        .and('have.css', 'background-color', 'rgb(253, 236, 234)');
    });
  });
});

export {};
