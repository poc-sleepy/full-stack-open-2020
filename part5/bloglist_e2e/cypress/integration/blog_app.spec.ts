describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = { username: 'poc', name: 'Poc Sleepy', password: 'password' };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('button').contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('.toggle_button').contains('login').click();
      cy.get('#username').type('poc');
      cy.get('#password').type('password');
      cy.get('#login_button').click();
      cy.contains('Poc Sleepy logged in.');
    });

    it('fails with wrong credentials', function () {
      cy.get('.toggle_button').contains('login').click();
      cy.get('#username').type('poc');
      cy.get('#password').type('wrong');
      cy.get('#login_button').click();
      cy.should('not.contain', 'Poc Sleepy logged in.');
      cy.get('#error_alert')
        .should('contain', 'invalid username or password')
        .and('have.css', 'background-color', 'rgb(253, 236, 234)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'poc',
        password: 'password',
      });
    });

    it('A blog can be created', function () {
      // 後続の実行が早すぎて失敗するので1秒待つ
      void (async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      })();
      cy.get('.toggle_button').contains('new blog').click();
      cy.get('#title').type('CypressによるE2Eテスト');
      cy.get('#author').type('Erai Hito');
      cy.get('#url').type('https://www.example.com/');
      cy.contains('create').click();
      cy.contains('CypressによるE2Eテスト Erai Hito');
    });

    describe('Some notes posted', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first Blog',
          author: 'Erai Hito',
          url: 'https://www.example.com/1/',
          likes: 4,
        });
        cy.createBlog({
          title: 'second Blog',
          author: 'Sugoi Hito',
          url: 'https://www.example.com/2/',
        });
        cy.createBlog({
          title: 'third Blog',
          author: 'Erai Hito',
          url: 'https://www.example.com/3/',
          likes: 9,
        });
      });

      it.only('blogs are sorted by likes desc', function () {
        cy.get('.blogCard').then(function (blogCards) {
          cy.wrap(blogCards[0]).contains('third Blog');
          cy.wrap(blogCards[1]).contains('first Blog');
          cy.wrap(blogCards[2]).contains('second Blog');
        });
      });

      it('likes can be incremented', function () {
        cy.contains('second Blog').as('blog');
        cy.get('@blog').find('.open_button').click();
        cy.get('@blog').contains('likes: 0');
        cy.get('@blog').find('.like_button').click();
        cy.get('@blog').contains('likes: 1');
      });

      it('user can remove own blogs', function () {
        cy.contains('second Blog').as('blog');
        cy.get('@blog').find('.open_button').click();
        cy.get('@blog').find('.remove_button').click();
        cy.should('not.contain', 'second Blog Sugoi Hito');
      });

      it('Not owner can not remove blogs', function () {
        const notOwner = {
          username: 'kakuni',
          name: 'Butano Kakuni',
          password: 'password',
        };
        cy.request('POST', 'http://localhost:3003/api/users', notOwner);
        cy.login(notOwner);

        cy.contains('second Blog').as('blog');
        cy.get('@blog').find('.open_button').click();
        cy.get('@blog').find('.remove_button').click();

        cy.get('#error_alert').should(
          'contain',
          'Request failed with status code 401'
        );
        cy.contains('second Blog');
      });
    });
  });
});

export {};
