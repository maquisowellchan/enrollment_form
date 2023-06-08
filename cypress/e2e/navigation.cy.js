describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard') // Replace with the URL of your application
  })

  it('should navigate to Dashboard', () => {
    cy.get('.sidebar-item:nth-child(1) a').click()
    // Add assertions or further actions specific to the Dashboard screen
  })

  it('should navigate to Subjects', () => {
    cy.get('.sidebar-item:nth-child(2) a').click()
    // Add assertions or further actions specific to the Subjects screen
  })

  it('should navigate to Students', () => {
    cy.get('.sidebar-item:nth-child(3) a').click()
    // Add assertions or further actions specific to the Students screen
  })

  it('should navigate to Instructor', () => {
    cy.get('.sidebar-item:nth-child(4) a').click()
    // Add assertions or further actions specific to the Instructor screen
  })

  // Add more tests for other screens if needed

  it('should navigate to Logout', () => {
    cy.viewport(1200, 800) // Adjust the viewport size as needed
    cy.get('.sidebar-item:last-child a')
      .click()
  
    // Add assertions or further actions specific to the Logout process
  })
  it('should click the Add Student button', () => {
    cy.get('button')
      .contains('Register Student')
      .click()
  
 
  })
})
