declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(credentials: Credentials): void;
      createNote(newNote: NewNote): void;
    }
  }
}

type Credentials = {
  username: string;
  password: string;
};

Cypress.Commands.add('login', ({ username, password }: Credentials) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

type NewNote = {
  content: string;
  important: boolean;
};

Cypress.Commands.add('createNote', ({ content, important }: NewNote) => {
  const userData = localStorage.getItem('loggedNoteappUser');
  if (userData === null) {
    return;
  }

  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      Authorization: `bearer ${JSON.parse(userData).token}`,
    },
  });

  cy.visit('http://localhost:3000');
});

export {};
