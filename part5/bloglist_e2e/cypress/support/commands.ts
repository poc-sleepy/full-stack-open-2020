declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(credentials: Credentials): void;
    }
  }
}

type Credentials = {
  username: string;
  password: string;
};

Cypress.Commands.add('login', ({ username, password }: Credentials) => {
  cy.request('POST', 'http://localhost:3003/api/login/', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('blogAppLoginUser', JSON.stringify(body));
  });
  cy.visit('http://localhost:3000');
});

export {};
