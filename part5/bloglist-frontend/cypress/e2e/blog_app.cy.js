describe('blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'user',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('localhost:3000')

  })

  it('Login form is shown', function () {
    cy.contains('login').click()

    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()

      cy.get('#username').type('user')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()

      cy.get('#username').type('user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'logged in')
    })
  })

  describe('When logged in', function(){
    beforeEach(function(){
      cy.contains('login').click()

      cy.get('#username').type('user')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function(){
      cy.contains('create').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('Mr Bean')
      cy.get('#url').type('www.happyface.com')
      cy.get('#submit-button').click()

      cy.contains('a note created by cypress')
    })
  })
})
