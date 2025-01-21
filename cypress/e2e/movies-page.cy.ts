describe('Movies Page', () => {
  beforeEach(() => {
    cy.visit('/movies')
    cy.login('user@example.com', '123456')
  })

  describe('When I paginating', () => {
    it('Should paginate correctly', () => {
      cy.findByText('Back').should('have.attr', 'aria-disabled', 'true')
      cy.contains('Page 1 of 1000')
      cy.findByText('Next').click()
      cy.url().should('include', '/movies?page=2')
      cy.contains('Page 2 of 1000')
      cy.findByText('Back').click()
      cy.url().should('include', '/movies?page=1')
      cy.contains('Page 1 of 1000')
      cy.findByText('Back').should('have.attr', 'aria-disabled', 'true')
    })
  })

  describe('When I search a movie', () => {
    it('Should return the movie', () => {
      cy.findByPlaceholderText('Search for movies...').type('The Godfather').click()
      cy.url().should('include', '/movies?query=The+Godfather')
      cy.get('tr').eq(1).findByText('The Godfather').should('exist')
    })
  })

  describe('When I want show dashboard page', () => {
    it('Should navigate correctly', () => {
      cy.findByText('Dashboard').click()
      cy.url().should('include', '/dashboard')
      cy.contains(/Average votes/)
    })
  })

  describe('When I sing out', () => {
    it('should go to login page', () => {
      cy.findByText('Sign Out').click()
      cy.url().should('include', '/login')
    })
  })
})
