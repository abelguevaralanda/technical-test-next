describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.findByLabelText('Email').as('email')
    cy.findByLabelText('Password').as('password')
  })

  describe('When I try to login and the credentials are incorrect', () => {
    it('Should show an error', () => {
      cy.login('user@app.com', '12345')
      cy.findByText('Log in').click()
      cy.findByText('Invalid credentials.').should('exist')
    })
  })

  describe('When I try to login and the credentials are correct', () => {
    it('Should redirect to home page', () => {
      cy.login('user@example.com', '123456')
      cy.findByText('Log in').click()
      cy.url().should('include', '/movies')
    })
  })
})
