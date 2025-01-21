describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('When I visit the page', () => {
    it('Should shows the welcome text', () => {
      cy.findByText('Welcome to your movie app.').should('exist')
    })
  })

  describe('When I click to login button', () => {
    it('Should redirect to login page', () => {
      cy.findByText('Log in').click()
    })
  })
})
